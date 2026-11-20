import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import apiRouter from "./routes/index.js";
import { handleStripeWebhook } from "./routes/payments.js";
import { runSeed } from "../scripts/seed.js";
import { connectDb, ensureIndexes } from "./config/db.js";

const app = express();
const allowedOrigins = [...new Set([
  process.env.CLIENT_URL || "http://localhost:3000",
  ...(process.env.CORS_ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).filter(Boolean),
  "http://localhost:3000",
  "http://127.0.0.1:3000"
])];

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    console.warn("Blocked FixMate CORS origin:", origin);
    return callback(new Error(`Origin is not allowed by FixMate CORS policy: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Stripe-Signature"]
}));

// Stripe needs the untouched request bytes. This route must be mounted before express.json().
app.post("/api/payments/webhook", express.raw({ type: "application/json", limit: "1mb" }), handleStripeWebhook);

// Apply rate limits to Better Auth as well as business APIs.
app.use("/api", rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: "draft-8", legacyHeaders: false }));
// Better Auth consumes its own request body; do not place express.json() before this handler.
const authHandler = toNodeHandler(auth);
app.all("/api/auth/*", async (req, res, next) => {
  try {
    // Ensure the shared MongoDB store is connected before Better Auth reads or writes OAuth state.
    await connectDb();
    return authHandler(req, res, next);
  } catch (error) {
    console.error("FixMate auth database unavailable:", error?.message || error);
    return res.status(503).json({
      success: false,
      message: "Authentication is temporarily unavailable. Please try again."
    });
  }
});
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await connectDb();
    res.json({ success: true, service: "FixMate API", database: "connected", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ success: false, service: "FixMate API", database: "unavailable", message: error.message });
  }
});

app.use("/api", apiRouter);
app.use((_req, res) => res.status(404).json({ success: false, message: "API route not found." }));
app.use((error, _req, res, _next) => {
  const status = Number(error?.status || error?.statusCode || 500);
  if (status >= 500) console.error("FixMate API error:", error?.stack || error);
  const message = status >= 500 ? "Something went wrong. Please try again." : error.message || "Request failed.";
  res.status(status).json({ success: false, message });
});

// Index creation is deliberately lazy so a cold start can still report configuration errors cleanly.
async function maybeRunExaminerSeedOnce() {
  if (process.env.FIXMATE_RUN_DEMO_SEED !== "true") return;
  const markerId = "examiner-demo-seed-2026-11-20-v1";
  const markers = db.collection("systemFlags");
  try {
    await markers.insertOne({ _id: markerId, status: "running", startedAt: new Date() });
  } catch (error) {
    if (error?.code === 11000) {
      console.log("FixMate examiner seed already claimed; skipping duplicate run.");
      return;
    }
    throw error;
  }
  try {
    const result = await runSeed();
    await markers.updateOne({ _id: markerId }, { $set: { status: "completed", completedAt: new Date(), result } });
    console.log("FixMate examiner demo data seeded:", JSON.stringify(result));
  } catch (error) {
    await markers.deleteOne({ _id: markerId }).catch(() => {});
    throw error;
  }
}
if (process.env.NODE_ENV !== "test") {
  connectDb()
    .then(async () => {
      await ensureIndexes();
      await maybeRunExaminerSeedOnce();
    })
    .catch((error) => console.error("Database initialization:", error.message));
}

export default app;
