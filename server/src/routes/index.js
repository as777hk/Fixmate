import { Router } from "express";
import serviceRoutes from "./services.js";
import bookingRoutes from "./bookings.js";
import userRoutes from "./users.js";
import uploadRoutes from "./uploads.js";
import paymentRoutes from "./payments.js";
import { adminRouter, dashboardRouter } from "./admin.js";

const router = Router();
router.use("/services", serviceRoutes);
router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/uploads", uploadRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRouter);
router.use("/dashboard", dashboardRouter);

export default router;
