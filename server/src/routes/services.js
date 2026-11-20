import { Router } from "express";
import { ObjectId } from "mongodb";
import { db, connectDb } from "../config/db.js";
import { verifyToken, verifyTechnician } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

const router = Router();
const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];
const modes = ["Home Visit", "Shop Drop-off"];
const editableFields = ["title", "category", "description", "image", "basePrice", "estimatedDuration", "serviceMode", "serviceArea"];
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Challenge 1: discovery is fully filtered, sorted and paginated by MongoDB.
router.get("/", asyncHandler(async (req, res) => {
  await connectDb();
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(48, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
  const query = { approvalStatus: "approved", isAvailable: true };
  const search = String(req.query.search || "").trim().slice(0, 80);
  if (search) {
    const pattern = new RegExp(escapeRegex(search), "i");
    query.$or = [{ title: pattern }, { category: pattern }];
  }
  if (categories.includes(String(req.query.category))) query.category = String(req.query.category);
  if (modes.includes(String(req.query.serviceMode))) query.serviceMode = String(req.query.serviceMode);

  const sortKey = String(req.query.sort || "newest");
  const sort = sortKey === "price_asc" ? { basePrice: 1, createdAt: -1 }
    : sortKey === "price_desc" ? { basePrice: -1, createdAt: -1 }
      : { createdAt: -1 };
  const collection = db.collection("services");
  const [total, services] = await Promise.all([
    collection.countDocuments(query),
    collection.find(query).sort(sort).skip((page - 1) * limit).limit(limit).toArray()
  ]);
  res.json({ success: true, data: services.map((item) => ({ ...item, _id: String(item._id) })), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}));

router.get("/my", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  const services = await db.collection("services").find({ technicianEmail: req.user.email }).sort({ createdAt: -1 }).toArray();
  res.json({ success: true, data: services.map((item) => ({ ...item, _id: String(item._id) })) });
}));

router.get("/:id", asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Service not found." });
  const service = await db.collection("services").findOne({ _id: new ObjectId(req.params.id), approvalStatus: "approved", isAvailable: true });
  if (!service) return res.status(404).json({ success: false, message: "Service not found." });
  const technician = await db.collection("users").findOne({ email: service.technicianEmail }, { projection: { password: 0, role: 0, email: 0 } });
  const reviews = await db.collection("bookings")
    .find({ serviceId: service._id.toString(), paymentStatus: "paid", rating: { $gte: 1 } })
    .sort({ reviewedAt: -1 })
    .limit(10)
    .project({ customerName: 1, rating: 1, review: 1, reviewedAt: 1 })
    .toArray();
  res.json({ success: true, data: {
    ...service,
    _id: String(service._id),
    technician: technician ? { name: technician.name, image: technician.image || "", area: technician.area || service.serviceArea, bio: technician.bio || "", plan: technician.plan === "pro" ? "pro" : "free" } : null,
    reviews: reviews.map((item) => ({ customerName: item.customerName, rating: item.rating, review: item.review, reviewedAt: item.reviewedAt }))
  } });
}));

router.post("/", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  const technician = await db.collection("users").findOne({ email: req.user.email }, { projection: { plan: 1 } });
  const plan = technician?.plan === "pro" ? "pro" : "free";
  if (plan === "free") {
    const activeListings = await db.collection("services").countDocuments({ technicianEmail: req.user.email });
    if (activeListings >= 3) return res.status(403).json({ success: false, message: "Your free plan includes up to 3 service listings. Upgrade to FixMate Pro for unlimited listings." });
  }
  const body = req.body || {};
  const title = String(body.title || "").trim();
  const category = String(body.category || "");
  const description = String(body.description || "").trim();
  const basePrice = Number(body.basePrice);
  const serviceMode = String(body.serviceMode || "");
  const serviceArea = String(body.serviceArea || "").trim();
  const estimatedDuration = String(body.estimatedDuration || "").trim();
  const image = String(body.image || "").trim();
  if (title.length < 4 || !categories.includes(category) || description.length < 30 || !Number.isFinite(basePrice) || basePrice <= 0 || !modes.includes(serviceMode) || !serviceArea || !estimatedDuration || !/^https:\/\//i.test(image)) {
    return res.status(400).json({ success: false, message: "Please complete every service field with valid values and an uploaded image." });
  }
  const service = {
    title, category, description, image, basePrice: Number(basePrice.toFixed(2)), estimatedDuration,
    serviceMode, serviceArea, technicianName: req.user.name, technicianEmail: req.user.email,
    approvalStatus: "pending", isAvailable: true, createdAt: new Date()
  };
  const result = await db.collection("services").insertOne(service);
  res.status(201).json({ success: true, message: "Service submitted and is waiting for admin approval.", data: { ...service, _id: String(result.insertedId) } });
}));

router.patch("/:id", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Service not found." });
  const collection = db.collection("services");
  const service = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (!service) return res.status(404).json({ success: false, message: "Service not found." });
  if (service.technicianEmail !== req.user.email) return res.status(403).json({ success: false, message: "You can only edit your own services." });

  const body = req.body || {};
  const isAvailabilityOnly = Object.keys(body).length === 1 && typeof body.isAvailable === "boolean";
  if (isAvailabilityOnly) {
    await collection.updateOne({ _id: service._id, technicianEmail: req.user.email }, { $set: { isAvailable: body.isAvailable } });
    return res.json({ success: true, message: "Availability updated.", data: { ...service, isAvailable: body.isAvailable } });
  }
  const update = {};
  for (const field of editableFields) if (body[field] !== undefined) update[field] = body[field];
  if (update.title !== undefined) update.title = String(update.title).trim();
  if (update.description !== undefined) update.description = String(update.description).trim();
  if (update.estimatedDuration !== undefined) update.estimatedDuration = String(update.estimatedDuration).trim();
  if (update.serviceArea !== undefined) update.serviceArea = String(update.serviceArea).trim();
  if (update.image !== undefined) update.image = String(update.image).trim();
  if (update.basePrice !== undefined) update.basePrice = Number(update.basePrice);
  if (update.category !== undefined && !categories.includes(update.category)) return res.status(400).json({ success: false, message: "Invalid service category." });
  if (update.serviceMode !== undefined && !modes.includes(update.serviceMode)) return res.status(400).json({ success: false, message: "Invalid service mode." });
  if (update.title !== undefined && update.title.length < 4) return res.status(400).json({ success: false, message: "Service title must be at least 4 characters." });
  if (update.description !== undefined && update.description.length < 30) return res.status(400).json({ success: false, message: "Description must be at least 30 characters." });
  if (update.basePrice !== undefined && (!Number.isFinite(update.basePrice) || update.basePrice <= 0)) return res.status(400).json({ success: false, message: "Base price must be greater than zero." });
  if (update.estimatedDuration !== undefined && !update.estimatedDuration) return res.status(400).json({ success: false, message: "Estimated duration is required." });
  if (update.serviceArea !== undefined && !update.serviceArea) return res.status(400).json({ success: false, message: "Service area is required." });
  if (update.image !== undefined && !/^https:\/\//i.test(update.image)) return res.status(400).json({ success: false, message: "Service image must be an HTTPS URL." });
  if (!Object.keys(update).length) return res.status(400).json({ success: false, message: "No editable service fields provided." });
  update.approvalStatus = "pending";
  update.updatedAt = new Date();
  await collection.updateOne({ _id: service._id, technicianEmail: req.user.email }, { $set: update });
  const updated = await collection.findOne({ _id: service._id });
  res.json({ success: true, message: "Service updated and returned to pending approval.", data: { ...updated, _id: String(updated._id) } });
}));

router.delete("/:id", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Service not found." });
  const result = await db.collection("services").deleteOne({ _id: new ObjectId(req.params.id), technicianEmail: req.user.email });
  if (!result.deletedCount) return res.status(404).json({ success: false, message: "Service not found or not owned by you." });
  res.json({ success: true, message: "Service deleted." });
}));

export default router;
