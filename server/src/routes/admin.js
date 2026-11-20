import { Router } from "express";
import { ObjectId } from "mongodb";
import { db, connectDb } from "../config/db.js";
import { verifyToken, verifyAdmin, verifyCustomer, verifyTechnician } from "../middleware/auth.js";
import { asyncHandler, userIdQuery } from "../utils/http.js";

export const adminRouter = Router();
export const dashboardRouter = Router();
const roleValues = ["customer", "technician", "admin"];
const serviceStates = ["pending", "approved", "rejected"];
const bookingStates = ["requested", "accepted", "in-progress", "completed", "rejected", "cancelled"];

adminRouter.get("/overview", verifyToken, verifyAdmin, asyncHandler(async (_req, res) => {
  await connectDb();
  const [totalUsers, technicians, pendingServices, revenueRows, recentBookings, pendingRows, monthly] = await Promise.all([
    db.collection("users").countDocuments({}),
    db.collection("users").countDocuments({ role: "technician" }),
    db.collection("services").countDocuments({ approvalStatus: "pending" }),
    db.collection("payments").aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]).toArray(),
    db.collection("bookings").find({}).sort({ createdAt: -1 }).limit(6).toArray(),
    db.collection("services").find({ approvalStatus: "pending" }).sort({ createdAt: 1 }).limit(6).toArray(),
    db.collection("payments").aggregate([
      { $match: { paidAt: { $gte: new Date(Date.now() - 180 * 86400000) } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$paidAt" } }, revenue: { $sum: "$amount" } } },
      { $sort: { _id: 1 } }
    ]).toArray()
  ]);
  const statusRows = await db.collection("bookings").aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray();
  res.json({ success: true, data: {
    totalUsers, totalTechnicians: technicians, pendingServices,
    totalRevenue: Number(revenueRows[0]?.total || 0),
    recentBookings: recentBookings.map((item) => ({ ...item, _id: String(item._id) })),
    pending: pendingRows.map((item) => ({ ...item, _id: String(item._id) })),
    revenueChart: monthly.map((item) => ({ label: item._id, value: item.revenue })),
    bookingChart: statusRows.map((item) => ({ label: item._id, value: item.count }))
  } });
}));

adminRouter.get("/users", verifyToken, verifyAdmin, asyncHandler(async (_req, res) => {
  await connectDb();
  const users = await db.collection("users").find({}, { projection: { name: 1, email: 1, image: 1, role: 1, phone: 1, area: 1, createdAt: 1 } }).sort({ createdAt: -1 }).limit(500).toArray();
  res.json({ success: true, data: users.map((item) => ({ ...item, id: String(item._id), _id: undefined })) });
}));

adminRouter.patch("/users/:id/role", verifyToken, verifyAdmin, asyncHandler(async (req, res) => {
  await connectDb();
  const { role } = req.body || {};
  if (!roleValues.includes(role)) return res.status(400).json({ success: false, message: "Choose a valid role." });
  if (String(req.params.id) === req.user.id) return res.status(400).json({ success: false, message: "You cannot change your own admin role." });
  const result = await db.collection("users").updateOne(userIdQuery(req.params.id), { $set: { role, updatedAt: new Date() } });
  if (!result.matchedCount) return res.status(404).json({ success: false, message: "User not found." });
  res.json({ success: true, message: "User role updated." });
}));

adminRouter.get("/services", verifyToken, verifyAdmin, asyncHandler(async (req, res) => {
  await connectDb();
  const query = {};
  const status = String(req.query.approvalStatus || "");
  if (serviceStates.includes(status)) query.approvalStatus = status;
  const services = await db.collection("services").find(query).sort({ approvalStatus: 1, createdAt: 1 }).limit(500).toArray();
  // Pending first regardless of lexical status order.
  const ordered = services.sort((a, b) => ({ pending: 0, rejected: 1, approved: 2 }[a.approvalStatus] - { pending: 0, rejected: 1, approved: 2 }[b.approvalStatus]) || new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, data: ordered.map((item) => ({ ...item, _id: String(item._id) })) });
}));

adminRouter.patch("/services/:id/approval", verifyToken, verifyAdmin, asyncHandler(async (req, res) => {
  await connectDb();
  if (!ObjectId.isValid(req.params.id)) return res.status(404).json({ success: false, message: "Service not found." });
  const { approvalStatus } = req.body || {};
  if (!["approved", "rejected"].includes(approvalStatus)) return res.status(400).json({ success: false, message: "Approval status must be approved or rejected." });
  const result = await db.collection("services").updateOne({ _id: new ObjectId(req.params.id) }, { $set: { approvalStatus, reviewedAt: new Date(), reviewedBy: req.user.email } });
  if (!result.matchedCount) return res.status(404).json({ success: false, message: "Service not found." });
  res.json({ success: true, message: `Service ${approvalStatus}.` });
}));

adminRouter.get("/bookings", verifyToken, verifyAdmin, asyncHandler(async (req, res) => {
  await connectDb();
  const query = {};
  const status = String(req.query.status || "");
  if (bookingStates.includes(status)) query.status = status;
  const bookings = await db.collection("bookings").find(query).sort({ createdAt: -1 }).limit(500).toArray();
  res.json({ success: true, data: bookings.map((item) => ({ ...item, _id: String(item._id) })) });
}));

adminRouter.get("/payments", verifyToken, verifyAdmin, asyncHandler(async (_req, res) => {
  await connectDb();
  const [payments, total] = await Promise.all([
    db.collection("payments").find({}).sort({ paidAt: -1 }).limit(500).toArray(),
    db.collection("payments").aggregate([{ $group: { _id: null, amount: { $sum: "$amount" } } }]).toArray()
  ]);
  res.json({ success: true, data: payments.map((item) => ({ ...item, _id: String(item._id) })), totalRevenue: Number(total[0]?.amount || 0) });
}));

// Role-specific overview metrics share the same API base but remain protected by role middleware.
dashboardRouter.get("/customer-stats", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  const [bookings, spendRows] = await Promise.all([
    db.collection("bookings").find({ customerEmail: req.user.email }).toArray(),
    db.collection("payments").aggregate([{ $match: { customerEmail: req.user.email, paymentStatus: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]).toArray()
  ]);
  const count = (status) => bookings.filter((item) => item.status === status).length;
  res.json({ success: true, data: {
    totalRequests: bookings.length,
    activeJobs: bookings.filter((item) => ["requested", "accepted", "in-progress"].includes(item.status)).length,
    completedJobs: count("completed"),
    totalSpent: Number(spendRows[0]?.total || 0),
    unpaidJobs: bookings.filter((item) => item.status === "completed" && item.paymentStatus === "unpaid").length,
    recentBookings: bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((item) => ({ ...item, _id: String(item._id) })),
    chart: ["requested", "accepted", "in-progress", "completed", "rejected", "cancelled"].map((status) => ({ label: status, value: count(status) }))
  } });
}));

dashboardRouter.get("/technician-stats", verifyToken, verifyTechnician, asyncHandler(async (req, res) => {
  await connectDb();
  const [totalServices, approvedServices, pendingRequests, paid] = await Promise.all([
    db.collection("services").countDocuments({ technicianEmail: req.user.email }),
    db.collection("services").countDocuments({ technicianEmail: req.user.email, approvalStatus: "approved" }),
    db.collection("bookings").countDocuments({ technicianEmail: req.user.email, status: "requested" }),
    db.collection("payments").aggregate([{ $match: { technicianEmail: req.user.email } }, { $group: { _id: null, amount: { $sum: "$amount" } } }]).toArray()
  ]);
  const [jobs, earnings] = await Promise.all([
    db.collection("bookings").aggregate([{ $match: { technicianEmail: req.user.email } }, { $group: { _id: "$status", count: { $sum: 1 } } }]).toArray(),
    db.collection("payments").aggregate([{ $match: { technicianEmail: req.user.email } }, { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$paidAt" } }, total: { $sum: "$amount" } } }, { $sort: { _id: 1 } }]).toArray()
  ]);
  res.json({ success: true, data: { totalServices, approvedServices, pendingRequests, totalEarnings: Number(paid[0]?.amount || 0), jobChart: jobs.map((item) => ({ label: item._id, value: item.count })), earningsChart: earnings.map((item) => ({ label: item._id, value: item.total })) } });
}));
