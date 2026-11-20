import { Router } from "express";
import { ObjectId } from "mongodb";
import { db, connectDb } from "../config/db.js";
import { verifyToken, verifyCustomer, verifyTechnician } from "../middleware/auth.js";
import { asyncHandler, isValidDateFromToday, userIdQuery } from "../utils/http.js";

const router = Router();
const ACTIVE = ["requested", "accepted", "in-progress"];
const TRANSITIONS = {
  requested: ["accepted", "rejected"],
  accepted: ["in-progress"],
  "in-progress": ["completed"]
};

router.post("/", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  const { serviceId, customerPhone, address, preferredDate, problemDescription } = req.body || {};
  if (!ObjectId.isValid(String(serviceId || ""))) return res.status(400).json({ success: false, message: "Choose a valid service." });
  if (String(customerPhone || "").trim().length < 7) return res.status(400).json({ success: false, message: "Enter a valid phone number." });
  if (String(address || "").trim().length < 8) return res.status(400).json({ success: false, message: "Enter the complete service address." });
  if (!isValidDateFromToday(preferredDate)) return res.status(400).json({ success: false, message: "Preferred date must be today or a future date." });
  const problem = String(problemDescription || "").trim();
  if (problem.length < 20) return res.status(400).json({ success: false, message: "Describe the problem in at least 20 characters." });

  const service = await db.collection("services").findOne({ _id: new ObjectId(serviceId), approvalStatus: "approved", isAvailable: true });
  if (!service) return res.status(404).json({ success: false, message: "This service is no longer available." });
  if (service.technicianEmail === req.user.email) return res.status(403).json({ success: false, message: "Technicians cannot request their own services." });
  const customer = await db.collection("users").findOne(userIdQuery(req.user.id));
  const activeKey = `${service._id.toString()}:${req.user.email.toLowerCase()}`;
  const existing = await db.collection("bookings").findOne({ serviceId: service._id.toString(), customerEmail: req.user.email, status: { $in: ACTIVE } });
  if (existing) return res.status(409).json({ success: false, message: "You already have an active request for this service" });

  const booking = {
    ticketNo: "FM-" + Date.now().toString().slice(-6),
    serviceId: service._id.toString(), serviceTitle: service.title, serviceImage: service.image, category: service.category,
    basePrice: service.basePrice, technicianName: service.technicianName, technicianEmail: service.technicianEmail,
    customerName: customer?.name || req.user.name, customerEmail: req.user.email,
    customerPhone: String(customerPhone).trim(), address: String(address).trim(), preferredDate: new Date(preferredDate),
    problemDescription: problem, status: "requested", finalAmount: service.basePrice, paymentStatus: "unpaid",
    activeKey, statusHistory: [{ status: "requested", changedAt: new Date(), actor: "customer" }], createdAt: new Date(), updatedAt: new Date()
  };
  try {
    const result = await db.collection("bookings").insertOne(booking);
    return res.status(201).json({ success: true, message: "Repair request sent successfully.", data: { ...booking, _id: String(result.insertedId) } });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: "You already have an active request for this service" });
    throw error;
  }
}));

router.get("/my", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  const bookings = await db.collection("bookings").find({ customerEmail: req.user.email }).sort({ createdAt: -1 }).toArray();
  const bookingIds = bookings.map((item) => item._id.toString());
  const payments = bookingIds.length ? await db.collection("payments").find({ bookingId: { $in: bookingIds } }).project({ bookingId: 1, transactionId: 1 }).toArray() : [];
  const transactionByBooking = new Map(payments.map((item) => [item.bookingId, item.transactionId]));
  res.json({ success: true, data: bookings.map((item) => ({ ...item, _id: String(item._id), paymentTransactionId: transactionByBooking.get(String(item._id)) || "" })) });
}));

router.get("/technician", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  const query = { technicianEmail: req.user.email };
  const status = String(req.query.status || "");
  if (["requested", "accepted", "in-progress", "completed", "rejected", "cancelled"].includes(status)) query.status = status;
  const bookings = await db.collection("bookings").find(query).sort({ preferredDate: 1, createdAt: -1 }).toArray();
  res.json({ success: true, data: bookings.map((item) => ({ ...item, _id: String(item._id) })) });
}));

router.patch("/:id/cancel", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Booking not found." });
  const now = new Date();
  const result = await db.collection("bookings").updateOne(
    { _id: new ObjectId(req.params.id), customerEmail: req.user.email, status: "requested" },
    { $set: { status: "cancelled", updatedAt: now }, $unset: { activeKey: "" }, $push: { statusHistory: { status: "cancelled", changedAt: now, actor: "customer" } } }
  );
  if (!result.modifiedCount) return res.status(400).json({ success: false, message: "Only a request that is still Requested can be cancelled." });
  res.json({ success: true, message: "Repair request cancelled." });
}));

router.patch("/:id/status", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Booking not found." });
  const { status: nextStatus } = req.body || {};
  const booking = await db.collection("bookings").findOne({ _id: new ObjectId(req.params.id), technicianEmail: req.user.email });
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found in your repair queue." });
  if (!TRANSITIONS[booking.status]?.includes(nextStatus)) return res.status(400).json({ success: false, message: `Invalid transition: ${booking.status} → ${String(nextStatus || "unknown")}.` });

  const update = { status: nextStatus, updatedAt: new Date() };
  const operators = { $set: update, $push: { statusHistory: { status: nextStatus, changedAt: new Date(), actor: "technician" } } };
  if (nextStatus === "completed") {
    const finalAmount = Number(req.body.finalAmount);
    if (!Number.isFinite(finalAmount) || finalAmount <= 0) return res.status(400).json({ success: false, message: "Final amount must be a number greater than zero." });
    operators.$set.finalAmount = Number(finalAmount.toFixed(2));
    operators.$unset = { activeKey: "" };
  }
  if (nextStatus === "rejected") operators.$unset = { activeKey: "" };
  const result = await db.collection("bookings").updateOne({ _id: booking._id, technicianEmail: req.user.email, status: booking.status }, operators);
  if (!result.modifiedCount) return res.status(409).json({ success: false, message: "The booking changed in another request. Refresh and try again." });
  const updated = await db.collection("bookings").findOne({ _id: booking._id });
  res.json({ success: true, message: `Booking moved to ${nextStatus}.`, data: { ...updated, _id: String(updated._id) } });
}));

router.post("/:id/review", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Booking not found." });
  const rating = Number(req.body?.rating);
  const review = String(req.body?.review || "").trim();
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "Choose a rating from 1 to 5 stars." });
  if (review.length < 8 || review.length > 600) return res.status(400).json({ success: false, message: "Your review must contain 8 to 600 characters." });
  const booking = await db.collection("bookings").findOne({ _id: new ObjectId(req.params.id), customerEmail: req.user.email });
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
  if (booking.status !== "completed" || booking.paymentStatus !== "paid") return res.status(400).json({ success: false, message: "You can review a repair after it has been completed and paid." });
  if (booking.rating) return res.status(409).json({ success: false, message: "You have already reviewed this repair." });
  const now = new Date();
  const updated = await db.collection("bookings").updateOne({ _id: booking._id, customerEmail: req.user.email, rating: { $exists: false }, status: "completed", paymentStatus: "paid" }, { $set: { rating, review, reviewedAt: now, updatedAt: now } });
  if (!updated.modifiedCount) return res.status(409).json({ success: false, message: "This repair was reviewed already. Refresh your bookings." });
  const totals = await db.collection("bookings").aggregate([
    { $match: { serviceId: booking.serviceId, paymentStatus: "paid", rating: { $gte: 1 } } },
    { $group: { _id: "$serviceId", ratingAvg: { $avg: "$rating" }, ratingCount: { $sum: 1 } } }
  ]).toArray();
  if (ObjectId.isValid(booking.serviceId) && totals[0]) {
    await db.collection("services").updateOne({ _id: new ObjectId(booking.serviceId) }, { $set: { ratingAvg: Number(totals[0].ratingAvg.toFixed(2)), ratingCount: totals[0].ratingCount } });
  }
  res.json({ success: true, message: "Thank you for sharing your repair experience.", data: { rating, review, reviewedAt: now } });
}));
export default router;
