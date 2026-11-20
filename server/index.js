import "dotenv/config";
import app from "./src/index.js";

export default app;

// Vercel imports the default Express export. Local Node starts a long-running server.
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => console.log(`FixMate API ready at http://localhost:${port}`));
}
