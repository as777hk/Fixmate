import { Router } from "express";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { db, connectDb } from "../config/db.js";
import { verifyToken, verifyCustomer } from "../middleware/auth.js";
import { asyncHandler } from "../utils/http.js";

const router = Router();
let stripeInstance;
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw Object.assign(new Error("Stripe is not configured. Add STRIPE_SECRET_KEY to the server environment."), { status: 503 });
  if (!stripeInstance) stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripeInstance;
}

async function markBookingPaid(booking) {
  if (booking.paymentStatus !== "paid") {
    await db.collection("bookings").updateOne(
      { _id: booking._id, customerEmail: booking.customerEmail, status: "completed", paymentStatus: "unpaid" },
      { $set: { paymentStatus: "paid", updatedAt: new Date() }, $push: { statusHistory: { status: "paid", changedAt: new Date(), actor: "stripe" } } }
    );
  }
  const latest = await db.collection("bookings").findOne({ _id: booking._id, customerEmail: booking.customerEmail });
  if (!latest || latest.status !== "completed" || latest.paymentStatus !== "paid") {
    throw Object.assign(new Error("Booking state changed before payment could be confirmed."), { status: 409 });
  }
  return latest;
}

async function fulfillBookingPayment(session) {
  await connectDb();
  if (session.payment_status !== "paid") throw Object.assign(new Error("Stripe session has not been paid."), { status: 400 });
  const bookingId = String(session.metadata?.bookingId || "");
  const customerEmail = String(session.metadata?.customerEmail || "").toLowerCase();
  if (!ObjectId.isValid(bookingId) || !customerEmail || !session.id) throw Object.assign(new Error("Stripe session metadata is incomplete."), { status: 400 });

  const booking = await db.collection("bookings").findOne({ _id: new ObjectId(bookingId), customerEmail });
  if (!booking) throw Object.assign(new Error("The booking for this payment could not be found."), { status: 404 });
  if (booking.status !== "completed") throw Object.assign(new Error("Payment is only available after job completion."), { status: 400 });
  const expectedCents = Math.round(Number(booking.finalAmount) * 100);
  if (!Number.isFinite(expectedCents) || expectedCents <= 0 || Number(session.amount_total) !== expectedCents || session.currency !== "usd") {
    throw Object.assign(new Error("The paid amount does not match the completed booking."), { status: 400 });
  }

  const existing = await db.collection("payments").findOne({ $or: [{ stripeSessionId: session.id }, { bookingId }] });
  if (existing) {
    await markBookingPaid(booking);
    return { ...existing, _id: String(existing._id), alreadyRecorded: true };
  }

  const payment = {
    bookingId,
    serviceTitle: booking.serviceTitle,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    technicianName: booking.technicianName,
    technicianEmail: booking.technicianEmail,
    amount: Number(booking.finalAmount),
    currency: "usd",
    transactionId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || "",
    stripeSessionId: session.id,
    paymentStatus: "paid",
    paidAt: new Date(session.created ? session.created * 1000 : Date.now())
  };
  try {
    const inserted = await db.collection("payments").insertOne(payment);
    try {
      await markBookingPaid(booking);
    } catch (error) {
      await db.collection("payments").deleteOne({ _id: inserted.insertedId });
      throw error;
    }
    return { ...payment, _id: String(inserted.insertedId), alreadyRecorded: false };
  } catch (error) {
    if (error?.code === 11000) {
      const duplicate = await db.collection("payments").findOne({ $or: [{ stripeSessionId: session.id }, { bookingId }] });
      if (duplicate) {
        await markBookingPaid(booking);
        return { ...duplicate, _id: String(duplicate._id), alreadyRecorded: true };
      }
    }
    throw error;
  }
}

async function fulfillTechnicianProPayment(session) {
  await connectDb();
  if (session.payment_status !== "paid") throw Object.assign(new Error("Stripe session has not been paid."), { status: 400 });
  const technicianEmail = String(session.metadata?.technicianEmail || "").toLowerCase();
  if (session.metadata?.purchaseType !== "technician_pro" || !technicianEmail || !session.id) throw Object.assign(new Error("Technician plan payment metadata is incomplete."), { status: 400 });
  if (Number(session.amount_total) !== 2900 || session.currency !== "usd") throw Object.assign(new Error("The paid amount does not match the FixMate Pro plan."), { status: 400 });
  const user = await db.collection("users").findOne({ email: technicianEmail, role: "technician" });
  if (!user) throw Object.assign(new Error("Technician account could not be found."), { status: 404 });
  const payment = {
    bookingId: "technician-plan:" + String(user._id) + ":" + session.id,
    serviceTitle: "FixMate Pro Technician Plan",
    customerName: user.name || "FixMate technician", customerEmail: user.email,
    technicianName: user.name || "FixMate technician", technicianEmail: user.email,
    amount: 29, currency: "usd",
    transactionId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || "",
    stripeSessionId: session.id, paymentStatus: "paid",
    paidAt: new Date(session.created ? session.created * 1000 : Date.now())
  };
  await db.collection("payments").updateOne({ stripeSessionId: session.id }, { $setOnInsert: payment }, { upsert: true });
  await db.collection("users").updateOne({ _id: user._id, role: "technician" }, { $set: { plan: "pro", proActivatedAt: new Date(), updatedAt: new Date() } });
  const saved = await db.collection("payments").findOne({ stripeSessionId: session.id });
  return { ...saved, _id: String(saved._id), plan: "pro" };
}
export async function handleStripeWebhook(req, res) {
  const stripe = getStripe();
  const signature = req.headers["stripe-signature"];
  if (!process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).json({ success: false, message: "Stripe webhook is not configured." });
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).json({ success: false, message: `Webhook signature verification failed: ${error.message}` });
  }
  try {
    if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        if (session.metadata?.purchaseType === "technician_pro") await fulfillTechnicianProPayment(session);
        else await fulfillBookingPayment(session);
      }
    }
    return res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook fulfillment failed:", error.message || error);
    return res.status(500).json({ success: false, message: "Payment event could not be fulfilled; Stripe may retry it." });
  }
}

router.post("/create-checkout-session", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  const bookingId = String(req.body?.bookingId || "");
  if (!ObjectId.isValid(bookingId)) return res.status(400).json({ success: false, message: "A valid bookingId is required." });
  const booking = await db.collection("bookings").findOne({ _id: new ObjectId(bookingId), customerEmail: req.user.email });
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
  if (booking.status !== "completed") return res.status(400).json({ success: false, message: "You can pay only after the job is completed." });
  if (booking.paymentStatus !== "unpaid") return res.status(400).json({ success: false, message: "This booking has already been paid." });
  if (!Number.isFinite(Number(booking.finalAmount)) || Number(booking.finalAmount) <= 0) return res.status(400).json({ success: false, message: "Booking amount is invalid." });

  const stripe = getStripe();
  const clientUrl = (process.env.CLIENT_URL || "http://localhost:3000").replace(/\/$/, "");
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "usd", product_data: { name: booking.serviceTitle }, unit_amount: Math.round(Number(booking.finalAmount) * 100) }, quantity: 1 }],
    success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/payment/cancel?booking_id=${booking._id.toString()}`,
    metadata: { bookingId: booking._id.toString(), customerEmail: booking.customerEmail }
  }, { idempotencyKey: `fixmate-booking-${booking._id.toString()}` });
  res.json({ success: true, data: { url: session.url, sessionId: session.id } });
}));

router.post("/create-pro-checkout-session", verifyToken, asyncHandler(async (req, res) => {
  await connectDb();
  if (req.user.role !== "technician") return res.status(403).json({ success: false, message: "Only technicians can upgrade this plan." });
  const user = await db.collection("users").findOne({ email: req.user.email, role: "technician" });
  if (!user) return res.status(404).json({ success: false, message: "Technician account could not be found." });
  if (user.plan === "pro") return res.status(409).json({ success: false, message: "Your FixMate Pro plan is already active." });
  const stripe = getStripe();
  const configuredClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  const clientUrl = configuredClientUrl.endsWith("/") ? configuredClientUrl.slice(0, -1) : configuredClientUrl;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "usd", product_data: { name: "FixMate Pro Technician Plan", description: "Unlimited service listings and a Verified Pro profile badge." }, unit_amount: 2900 }, quantity: 1 }],
    success_url: clientUrl + "/dashboard/technician?plan_session_id={CHECKOUT_SESSION_ID}",
    cancel_url: clientUrl + "/dashboard/technician?plan_cancelled=1",
    metadata: { purchaseType: "technician_pro", technicianEmail: user.email, technicianId: String(user._id) }
  }, { idempotencyKey: "fixmate-pro-" + String(user._id) + "-" + Date.now() });
  res.json({ success: true, data: { url: session.url, sessionId: session.id } });
}));

router.get("/verify-pro", verifyToken, asyncHandler(async (req, res) => {
  if (req.user.role !== "technician") return res.status(403).json({ success: false, message: "Only technicians can verify this plan." });
  const sessionId = String(req.query.session_id || "");
  if (!sessionId) return res.status(400).json({ success: false, message: "Stripe session_id is required." });
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.technicianEmail?.toLowerCase() !== req.user.email.toLowerCase()) return res.status(403).json({ success: false, message: "This plan payment does not belong to your account." });
  const payment = await fulfillTechnicianProPayment(session);
  res.json({ success: true, data: { plan: "pro", payment } });
}));
router.get("/verify", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  const sessionId = String(req.query.session_id || "");
  if (!sessionId) return res.status(400).json({ success: false, message: "Stripe session_id is required." });
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.metadata?.customerEmail?.toLowerCase() !== req.user.email.toLowerCase()) return res.status(403).json({ success: false, message: "This payment does not belong to your account." });
  const payment = await fulfillBookingPayment(session);
  res.json({ success: true, data: { ...payment, amount: Number(payment.amount), currency: payment.currency, transactionId: payment.transactionId, serviceTitle: payment.serviceTitle } });
}));

router.get("/my", verifyToken, verifyCustomer, asyncHandler(async (req, res) => {
  await connectDb();
  const payments = await db.collection("payments").find({ customerEmail: req.user.email }).sort({ paidAt: -1 }).toArray();
  res.json({ success: true, data: payments.map((item) => ({ ...item, _id: String(item._id) })) });
}));

export default router;
