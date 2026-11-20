import { ObjectId } from "mongodb";

export class HttpError extends Error {
  constructor(status, message, details = undefined) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

export function asyncHandler(handler) {
  return function wrapped(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function sendError(res, status, message, details) {
  return res.status(status).json({ success: false, message, ...(details ? { details } : {}) });
}

export function parseObjectId(value) {
  return ObjectId.isValid(String(value || "")) ? new ObjectId(String(value)) : null;
}

export function userIdQuery(value) {
  const id = String(value || "");
  const candidates = [id];
  if (ObjectId.isValid(id)) candidates.push(new ObjectId(id));
  return { _id: { $in: candidates } };
}

export function safeUser(user) {
  if (!user) return null;
  return {
    id: String(user._id ?? user.id),
    name: user.name || "FixMate member",
    email: user.email,
    image: user.image || "",
    role: user.role || "customer",
    phone: user.phone || "",
    area: user.area || "",
    bio: user.bio || "",
    createdAt: user.createdAt || null
  };
}

export function toObjectId(value) {
  if (!ObjectId.isValid(String(value || ""))) return null;
  return new ObjectId(String(value));
}

export function isValidDateFromToday(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date >= now;
}

export function publicService(service) {
  if (!service) return null;
  return { ...service, _id: String(service._id) };
}

export function publicBooking(booking) {
  if (!booking) return null;
  return { ...booking, _id: String(booking._id), serviceId: String(booking.serviceId) };
}
