import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) return callback(Object.assign(new Error("Only JPG, PNG or WEBP images are allowed."), { status: 400 }));
    callback(null, true);
  }
});

router.post("/image", verifyToken, upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Choose an image file first." });
  if (!process.env.IMGBB_API_KEY) return res.status(503).json({ success: false, message: "Image uploads are not configured on the server yet." });
  const form = new URLSearchParams();
  form.set("image", req.file.buffer.toString("base64"));
  form.set("name", req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80));
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(process.env.IMGBB_API_KEY)}`, { method: "POST", body: form });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload?.success || !payload?.data?.url) {
    console.error("ImgBB upload failed:", payload?.error?.message || response.statusText);
    return res.status(502).json({ success: false, message: "Image upload failed. Please try another image." });
  }
  res.status(201).json({ success: true, data: { url: payload.data.url, displayUrl: payload.data.display_url, deleteUrl: payload.data.delete_url || null } });
}));

export default router;
