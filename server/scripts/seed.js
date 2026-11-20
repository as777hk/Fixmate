import "dotenv/config";
import { pathToFileURL } from "node:url";
import { auth } from "../src/lib/auth.js";
import { db, connectDb, ensureIndexes } from "../src/config/db.js";

const localDefaults = {
  admin: { email: "admin@fixmate.local", password: "FixMateAdmin123!", name: "FixMate Admin", role: "admin" },
  technicianOne: { email: "tech1@fixmate.local", password: "FixMateTech123!", name: "Ariyan Rahman", role: "technician", plan: "pro", area: "Dhanmondi, Dhaka", bio: "Mobile and laptop repair specialist with 7 years of bench and on-site experience." },
  technicianTwo: { email: "tech2@fixmate.local", password: "FixMateTech123!", name: "Nusrat Jahan", role: "technician", area: "Uttara, Dhaka", bio: "Home appliance technician focused on AC, refrigeration and electrical diagnostics." },
  customer: { email: "customer@fixmate.local", password: "FixMateCustomer123!", name: "Samira Ahmed", role: "customer", area: "Gulshan, Dhaka" }
};

const accounts = {
  admin: { ...localDefaults.admin, email: process.env.ADMIN_EMAIL || localDefaults.admin.email, password: process.env.ADMIN_PASSWORD || localDefaults.admin.password },
  technicianOne: { ...localDefaults.technicianOne, email: process.env.TECHNICIAN_ONE_EMAIL || localDefaults.technicianOne.email, password: process.env.TECHNICIAN_ONE_PASSWORD || localDefaults.technicianOne.password },
  technicianTwo: { ...localDefaults.technicianTwo, email: process.env.TECHNICIAN_TWO_EMAIL || localDefaults.technicianTwo.email, password: process.env.TECHNICIAN_TWO_PASSWORD || localDefaults.technicianTwo.password },
  customer: { ...localDefaults.customer, email: process.env.CUSTOMER_EMAIL || localDefaults.customer.email, password: process.env.CUSTOMER_PASSWORD || localDefaults.customer.password }
};

if (process.env.NODE_ENV === "production") {
  for (const [key, account] of Object.entries(accounts)) {
    const passwordKey = ({ admin: "ADMIN_PASSWORD", technicianOne: "TECHNICIAN_ONE_PASSWORD", technicianTwo: "TECHNICIAN_TWO_PASSWORD", customer: "CUSTOMER_PASSWORD" })[key];
    if (!process.env[passwordKey] || account.password.length < 12) throw new Error(`Set a secure ${passwordKey} (12+ characters) before production seeding.`);
  }
}

async function ensureAccount(account) {
  let user = await db.collection("users").findOne({ email: account.email.toLowerCase() });
  if (!user) {
    try {
      await auth.api.signUpEmail({ body: { name: account.name, email: account.email.toLowerCase(), password: account.password, role: account.role } });
      user = await db.collection("users").findOne({ email: account.email.toLowerCase() });
      if (!user) throw new Error(`Better Auth created ${account.email}, but the MongoDB user record could not be reloaded.`);
    } catch (error) {
      user = await db.collection("users").findOne({ email: account.email.toLowerCase() });
      if (!user) throw error;
    }
  }
  const updates = {
    role: account.role,
    plan: account.plan === "pro" || user.plan === "pro" ? "pro" : "free",
    area: account.area || "Dhaka, Bangladesh",
    bio: account.bio || (account.role === "customer" ? "FixMate member." : "Verified FixMate service professional."),
    image: user.image || "",
    updatedAt: new Date()
  };
  await db.collection("users").updateOne({ _id: user._id }, { $set: updates });
  return { ...user, ...updates, _id: user._id };
}

const image = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const services = [
  { seedKey: "iphone-screen", title: "iPhone Screen Replacement", category: "Smartphone", description: "Precision screen replacement with display calibration, touch testing and a careful device health check before handover.", basePrice: 79, estimatedDuration: "2–3 hours", serviceMode: "Shop Drop-off", serviceArea: "Dhanmondi, Dhaka", image: "/images/srv-101-iphone-oled.webp" },
  { seedKey: "android-battery", title: "Android Battery & Charging Repair", category: "Smartphone", description: "Battery diagnostics, charging-port inspection and safe replacement for popular Android phone models.", basePrice: 39, estimatedDuration: "1–2 hours", serviceMode: "Shop Drop-off", serviceArea: "Uttara, Dhaka", image: "/images/srv-108-samsung-battery.webp" },
  { seedKey: "laptop-tuneup", title: "Laptop Performance Tune-up", category: "Laptop & PC", description: "Thermal cleaning, storage health checks, operating-system tune-up and performance diagnostics for laptops.", basePrice: 55, estimatedDuration: "3–4 hours", serviceMode: "Home Visit", serviceArea: "Gulshan, Dhaka", image: "/images/srv-109-gaming-laptop-thermal.webp" },
  { seedKey: "laptop-board", title: "Laptop Motherboard Diagnostics", category: "Laptop & PC", description: "Power-rail testing, component-level fault tracing and a written repair recommendation before component work.", basePrice: 65, estimatedDuration: "1 day", serviceMode: "Shop Drop-off", serviceArea: "Dhanmondi, Dhaka", image: "/images/srv-103-macbook-board.webp" },
  { seedKey: "ac-service", title: "Split AC Deep Service", category: "AC", description: "Indoor and outdoor unit cleaning, drain inspection, airflow checks and a post-service cooling test.", basePrice: 45, estimatedDuration: "2–3 hours", serviceMode: "Home Visit", serviceArea: "Uttara, Dhaka", image: "/images/srv-102-ac-wash.webp" },
  { seedKey: "ac-gas", title: "AC Cooling & Refrigerant Check", category: "AC", description: "Cooling diagnosis, leak inspection and refrigerant pressure assessment with approval before any refill.", basePrice: 35, estimatedDuration: "1–2 hours", serviceMode: "Home Visit", serviceArea: "Gulshan, Dhaka", image: "/images/srv-110-ac-outdoor-pcb.webp" },
  { seedKey: "fridge-cooling", title: "Refrigerator Cooling Repair", category: "Refrigerator", description: "Temperature diagnosis, thermostat and fan checks, condenser cleaning and a clear repair estimate.", basePrice: 49, estimatedDuration: "2–4 hours", serviceMode: "Home Visit", serviceArea: "Mirpur, Dhaka", image: "/images/srv-104-fridge-compressor.webp" },
  { seedKey: "fridge-door", title: "Frost-Free Refrigerator Defrost & Sensor Repair", category: "Refrigerator", description: "Defrost heater, thermostat and sensor diagnostics to clear ice buildup and restore stable refrigerator temperatures.", basePrice: 45, estimatedDuration: "2 hours", serviceMode: "Home Visit", serviceArea: "Uttara, Dhaka", image: "/images/srv-111-fridge-defrost.webp" },
  { seedKey: "tv-screen", title: "Smart TV Display Diagnostics", category: "TV", description: "Panel, backlight, power-board and display-input diagnostics with a practical repair recommendation.", basePrice: 59, estimatedDuration: "2–3 hours", serviceMode: "Shop Drop-off", serviceArea: "Dhanmondi, Dhaka", image: "/images/srv-105-smart-tv-led.webp" },
  { seedKey: "tv-wall", title: "iPad Pro Display & Touch Repair", category: "Smartphone", description: "iPad Pro display, touch digitizer and USB-C dock diagnostics with careful screen handling and functional testing.", basePrice: 110, estimatedDuration: "1 day", serviceMode: "Shop Drop-off", serviceArea: "Dhanmondi, Dhaka", image: "/images/srv-113-ipad-pro-screen.webp" },
  { seedKey: "washer-drain", title: "Washing Machine Drain Repair", category: "Washing Machine", description: "Drain pump, hose, filter and water-flow inspection for washing machines that will not drain correctly.", basePrice: 38, estimatedDuration: "2 hours", serviceMode: "Home Visit", serviceArea: "Uttara, Dhaka", image: "/images/srv-106-washing-machine.webp" },
  { seedKey: "washer-install", title: "EV Home Charger & Dedicated Circuit Setup", category: "Electrical", description: "Dedicated high-load circuit installation with safe cable routing, earthing checks and surge protection for home EV charging.", basePrice: 70, estimatedDuration: "4 hours", serviceMode: "Home Visit", serviceArea: "Gulshan, Banani & Uttara, Dhaka", image: "/images/srv-112-ev-charger-circuit.webp" },
  { seedKey: "electrical-check", title: "Home Electrical Safety Check", category: "Electrical", description: "Outlet, switch, breaker and visible wiring inspection with safety-first recommendations and clear scope approval.", basePrice: 42, estimatedDuration: "2–3 hours", serviceMode: "Home Visit", serviceArea: "Gulshan, Dhaka", image: "/images/srv-107-electrical-db.webp" },
];

export export async function runSeed() {
  await connectDb();
  await ensureIndexes();
  const [admin, techOne, techTwo, customer] = await Promise.all([
    ensureAccount(accounts.admin), ensureAccount(accounts.technicianOne), ensureAccount(accounts.technicianTwo), ensureAccount(accounts.customer)
  ]);
  const serviceDocs = [];
  for (let index = 0; index < services.length; index += 1) {
    const spec = services[index];
    const technician = index % 2 === 0 ? techOne : techTwo;
    serviceDocs.push({
      ...spec,
      technicianName: technician.name,
      technicianEmail: technician.email,
      approvalStatus: "approved",
      isAvailable: true,
      createdAt: new Date(Date.now() - (services.length - index) * 86400000)
    });
  }
  const pendingSpecs = [
    { seedKey: "pending-console", title: "Game Console HDMI Repair", category: "Smartphone", description: "HDMI port inspection and console video-output diagnostics with a documented repair estimate before work begins.", basePrice: 62, estimatedDuration: "1 day", serviceMode: "Shop Drop-off", serviceArea: "Dhanmondi, Dhaka", image: image("photo-1592840496694-26d035b52b48"), technician: techOne },
    { seedKey: "pending-dishwasher", title: "Dishwasher Leak Diagnostics", category: "Washing Machine", description: "Leak-path inspection, inlet and drain checks and a safety assessment for built-in and freestanding units.", basePrice: 44, estimatedDuration: "2–3 hours", serviceMode: "Home Visit", serviceArea: "Uttara, Dhaka", image: image("photo-1626806787461-102c1bfaaea1"), technician: techTwo }
  ];
  for (const spec of pendingSpecs) {
    const { technician, ...service } = spec;
    serviceDocs.push({ ...service, technicianName: technician.name, technicianEmail: technician.email, approvalStatus: "pending", isAvailable: true, createdAt: new Date() });
  }

  // Remove the retired extra seed listing so the public asset set remains one-to-one with 13 services.
  await db.collection("services").deleteOne({ seedKey: "fan-wiring" });

  const serviceIds = new Map();
  for (const spec of serviceDocs) {
    const existing = await db.collection("services").findOne({ seedKey: spec.seedKey });
    if (existing) {
      await db.collection("services").updateOne({ _id: existing._id }, { $set: { ...spec, updatedAt: new Date() } });
      serviceIds.set(spec.seedKey, existing._id.toString());
    } else {
      const result = await db.collection("services").insertOne(spec);
      serviceIds.set(spec.seedKey, result.insertedId.toString());
    }
  }

  const bookingSpecs = [
    { seedKey: "demo-requested", serviceKey: "iphone-screen", technician: techOne, status: "requested", days: 2, desc: "The display has developed a vertical green line and touch is unresponsive near the lower edge." },
    { seedKey: "demo-accepted", serviceKey: "laptop-tuneup", technician: techOne, status: "accepted", days: 1, desc: "The laptop overheats during video calls and the fan becomes unusually loud after a few minutes." },
    { seedKey: "demo-progress", serviceKey: "ac-service", technician: techTwo, status: "in-progress", days: 0, desc: "The AC runs continuously but the room does not cool properly even at the lowest temperature setting." },
    { seedKey: "demo-completed-unpaid", serviceKey: "fridge-cooling", technician: techTwo, status: "completed", days: -1, desc: "The refrigerator section is warm while the freezer still works. Please inspect airflow and the thermostat." },
    { seedKey: "demo-completed-paid", serviceKey: "tv-screen", technician: techOne, status: "completed", paymentStatus: "paid", days: -5, desc: "The TV screen flickers after startup and shows a dim patch on the right side of the display." }
  ];
  let paidBooking;
  for (const [bookingIndex, spec] of bookingSpecs.entries()) {
    const service = serviceDocs.find((item) => item.seedKey === spec.serviceKey);
    const serviceId = serviceIds.get(spec.serviceKey);
    const preferredDate = new Date();
    preferredDate.setDate(preferredDate.getDate() + spec.days);
    const booking = {
      ticketNo: "FM-" + String(1041 + bookingIndex),
      seedKey: spec.seedKey, serviceId, serviceTitle: service.title, serviceImage: service.image, category: service.category,
      basePrice: service.basePrice, technicianName: spec.technician.name, technicianEmail: spec.technician.email,
      customerName: customer.name, customerEmail: customer.email, customerPhone: "+880 1700-123456",
      address: "House 24, Road 11, Gulshan, Dhaka", preferredDate, problemDescription: spec.desc,
      status: spec.status, finalAmount: spec.status === "completed" ? (spec.paymentStatus === "paid" ? service.basePrice + 18 : service.basePrice + 12) : service.basePrice,
      paymentStatus: spec.paymentStatus || "unpaid",
      ...( ["requested", "accepted", "in-progress"].includes(spec.status) ? { activeKey: `${serviceId}:${customer.email.toLowerCase()}` } : {} ),
      statusHistory: [
        { status: "requested", changedAt: new Date(Date.now() - 2 * 86400000), actor: "customer" },
        ...(spec.status !== "requested" ? [{ status: "accepted", changedAt: new Date(Date.now() - 86400000), actor: "technician" }] : []),
        ...(spec.status === "in-progress" || spec.status === "completed" ? [{ status: "in-progress", changedAt: new Date(Date.now() - 12 * 3600000), actor: "technician" }] : []),
        ...(spec.status === "completed" ? [{ status: "completed", changedAt: new Date(Date.now() - 6 * 3600000), actor: "technician" }] : []),
        ...(spec.paymentStatus === "paid" ? [{ status: "paid", changedAt: new Date(Date.now() - 5 * 86400000), actor: "stripe" }] : [])
      ], createdAt: new Date(Date.now() - Math.max(0, 5 - spec.days) * 86400000), updatedAt: new Date()
    };
    const existing = await db.collection("bookings").findOne({ seedKey: spec.seedKey });
    let id;
    if (existing) {
      await db.collection("bookings").updateOne({ _id: existing._id }, { $set: booking });
      id = existing._id;
    } else {
      const result = await db.collection("bookings").insertOne(booking);
      id = result.insertedId;
    }
    if (spec.paymentStatus === "paid") paidBooking = { ...booking, _id: id };
  }
  if (paidBooking) {
    const payment = {
      bookingId: paidBooking._id.toString(), serviceTitle: paidBooking.serviceTitle,
      customerName: paidBooking.customerName, customerEmail: paidBooking.customerEmail,
      technicianName: paidBooking.technicianName, technicianEmail: paidBooking.technicianEmail,
      amount: paidBooking.finalAmount, currency: "usd", transactionId: "pi_fixmate_demo_paid",
      stripeSessionId: "cs_fixmate_demo_paid", paymentStatus: "paid", paidAt: new Date(Date.now() - 5 * 86400000)
    };
    await db.collection("payments").updateOne({ stripeSessionId: payment.stripeSessionId }, { $setOnInsert: payment }, { upsert: true });
  }

  console.log("\nFixMate seed complete.");
  console.log(`Admin: ${admin.email}`);
  console.log(`Technician 1: ${techOne.email}`);
  console.log(`Technician 2: ${techTwo.email}`);
  console.log(`Customer: ${customer.email}`);
  console.log("Created/updated 13 approved services, 2 pending services, 5 sample bookings and a paid demo transaction.");
  console.log("Local demo passwords are documented in README.md; production values must be supplied through environment variables.");
  return { success: true, users: 4, approvedServices: 13, pendingServices: 2, bookings: 5, payments: 1 };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  runSeed().then((result) => {
    console.log("FixMate seed result:", result);
    process.exit(0);
  }).catch((error) => {
    console.error("FixMate seed failed:", error);
    process.exit(1);
  });
}
