import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "fixmate";

const globalForMongo = globalThis;
if (!globalForMongo.__fixmateMongoClient) {
  globalForMongo.__fixmateMongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
  });
  globalForMongo.__fixmateMongoPromise = null;
}

export const client = globalForMongo.__fixmateMongoClient;
export const db = client.db(dbName);

export async function connectDb() {
  if (!globalForMongo.__fixmateMongoPromise) {
    globalForMongo.__fixmateMongoPromise = client.connect().catch((error) => {
      globalForMongo.__fixmateMongoPromise = null;
      throw error;
    });
  }
  await globalForMongo.__fixmateMongoPromise;
  return db;
}

export async function ensureIndexes() {
  await connectDb();
  await Promise.all([
    db.collection("services").createIndex({ approvalStatus: 1, isAvailable: 1, createdAt: -1 }),
    db.collection("services").createIndex({ technicianEmail: 1, createdAt: -1 }),
    db.collection("services").createIndex({ category: 1, serviceMode: 1, basePrice: 1 }),
    db.collection("bookings").createIndex({ customerEmail: 1, createdAt: -1 }),
    db.collection("bookings").createIndex({ technicianEmail: 1, status: 1, createdAt: -1 }),
    db.collection("bookings").createIndex({ activeKey: 1 }, { unique: true, sparse: true }),
    db.collection("bookings").createIndex({ serviceId: 1, customerEmail: 1, status: 1 }),
    db.collection("payments").createIndex({ stripeSessionId: 1 }, { unique: true }),
    db.collection("payments").createIndex({ bookingId: 1 }, { unique: true }),
    db.collection("payments").createIndex({ customerEmail: 1, paidAt: -1 }),
    db.collection("payments").createIndex({ technicianEmail: 1, paidAt: -1 })
  ]);
}
