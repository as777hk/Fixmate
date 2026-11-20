import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "../config/db.js";

const apiBase = (process.env.BETTER_AUTH_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");
const configuredSecret = process.env.BETTER_AUTH_SECRET;
if (process.env.NODE_ENV === "production" && !configuredSecret) {
  throw new Error("BETTER_AUTH_SECRET must be configured in production.");
}
const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

const trustedOrigins = [...new Set([
  process.env.CLIENT_URL || "http://localhost:3000",
  ...(process.env.CORS_ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean),
  "http://localhost:3000",
  "http://127.0.0.1:3000"
])];

export const auth = betterAuth({
  appName: "FixMate",
  baseURL: apiBase,
  secret: configuredSecret || "local-only-fixmate-secret-change-before-production-32-chars",
  database: mongodbAdapter(db),
  trustedOrigins,
  ...(googleClientId && googleClientSecret ? {
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        prompt: "select_account",
        mapProfileToUser: () => ({ role: "customer" })
      }
    }
  } : {}),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    requireEmailVerification: false
  },
  user: {
    modelName: "users",
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "customer", input: true },
      phone: { type: "string", required: false, input: false },
      area: { type: "string", required: false, input: false },
      bio: { type: "string", required: false, input: false }
    }
  },
  plugins: [jwt({ jwt: { definePayload: ({ user }) => ({ id: user.id, email: user.email }) } })],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const body = ctx.body || {};
      const password = String(body.password || "");
      if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must be at least 6 characters and include one uppercase and one lowercase letter."
        });
      }
      const requestedRole = body.role;
      const role = requestedRole === "technician" ? "technician" : "customer";
      return { context: { ...ctx, body: { ...body, role } } };
    })
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: process.env.NODE_ENV === "production"
      ? { sameSite: "lax", secure: true, httpOnly: true }
      : { sameSite: "lax", secure: false, httpOnly: true }
  }
});

export const authBaseURL = apiBase;
