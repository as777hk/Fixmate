import { Router } from "express";
import { db, connectDb } from "../config/db.js";
import { verifyToken } from "../middleware/auth.js";
import { asyncHandler, userIdQuery } from "../utils/http.js";

const router = Router();
const editable = ["name", "phone", "area", "bio", "image"];

router.get("/me", verifyToken, asyncHandler(async (req, res) => {
  await connectDb();
  const user = await db.collection("users").findOne(userIdQuery(req.user.id), { projection: { email: 1, name: 1, image: 1, role: 1, phone: 1, area: 1, bio: 1, createdAt: 1 } });
  if (!user) return res.status(404).json({ success: false, message: "User profile not found." });
  res.json({ success: true, data: { ...user, id: String(user._id), _id: undefined } });
}));

router.patch("/profile", verifyToken, asyncHandler(async (req, res) => {
  await connectDb();
  const body = req.body || {};
  if (body.email !== undefined || body.role !== undefined || body._id !== undefined || body.id !== undefined) {
    return res.status(400).json({ success: false, message: "Email and role are read-only profile fields." });
  }
  const update = {};
  for (const field of editable) if (body[field] !== undefined) update[field] = String(body[field]).trim();
  if (!Object.keys(update).length) return res.status(400).json({ success: false, message: "No profile fields were provided." });
  if (update.name !== undefined && (update.name.length < 2 || update.name.length > 80)) return res.status(400).json({ success: false, message: "Name must contain 2–80 characters." });
  if (update.phone !== undefined && update.phone.length > 32) return res.status(400).json({ success: false, message: "Phone number is too long." });
  if (update.area !== undefined && update.area.length > 120) return res.status(400).json({ success: false, message: "Area is too long." });
  if (update.bio !== undefined && update.bio.length > 500) return res.status(400).json({ success: false, message: "Bio must be 500 characters or fewer." });
  if (update.image !== undefined && update.image && !/^https:\/\//i.test(update.image)) return res.status(400).json({ success: false, message: "Profile photo must be an HTTPS image URL." });
  update.updatedAt = new Date();
  await db.collection("users").updateOne(userIdQuery(req.user.id), { $set: update });
  const user = await db.collection("users").findOne(userIdQuery(req.user.id), { projection: { email: 1, name: 1, image: 1, role: 1, phone: 1, area: 1, bio: 1, createdAt: 1 } });
  res.json({ success: true, message: "Profile updated.", data: { ...user, id: String(user._id), _id: undefined } });
}));

export default router;
