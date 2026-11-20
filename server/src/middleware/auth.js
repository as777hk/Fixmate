import { createRemoteJWKSet, jwtVerify } from "jose";
import { db, connectDb } from "../config/db.js";
import { asyncHandler, userIdQuery } from "../utils/http.js";

const authBase = (process.env.BETTER_AUTH_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");
let jwks;
function getJwks() {
  if (!jwks) jwks = createRemoteJWKSet(new URL(`${authBase}/api/auth/jwks`));
  return jwks;
}

export const verifyToken = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return res.status(401).json({ success: false, message: "Authentication token is required." });

  try {
    const { payload } = await jwtVerify(token, getJwks(), { issuer: authBase, audience: authBase });
    if (!payload.sub || !payload.email) {
      return res.status(401).json({ success: false, message: "Invalid authentication token." });
    }
    await connectDb();
    const user = await db.collection("users").findOne(userIdQuery(payload.sub));
    if (!user) return res.status(401).json({ success: false, message: "Account no longer exists." });
    req.user = {
      id: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role || "customer",
      image: user.image || ""
    };
    next();
  } catch (error) {
    if (error?.code === "ERR_JWKS_NO_MATCHING_KEY" || error?.code === "ERR_JWT_EXPIRED" || error?.code === "ERR_JWS_INVALID" || error?.code === "ERR_JWT_CLAIM_VALIDATION_FAILED" || error?.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return res.status(401).json({ success: false, message: "Invalid or expired authentication token." });
    }
    console.error("JWT verification error:", error?.message || error);
    return res.status(401).json({ success: false, message: "Unable to verify authentication token." });
  }
});

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: "Authentication required." });
    if (req.user.role !== role) return res.status(403).json({ success: false, message: `This action requires the ${role} role.` });
    next();
  };
}

export const verifyCustomer = requireRole("customer");
export const verifyTechnician = requireRole("technician");
export const verifyAdmin = requireRole("admin");
