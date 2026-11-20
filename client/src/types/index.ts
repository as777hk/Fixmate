export type UserRole = "customer" | "technician" | "admin";
export type ServiceCategory = "Smartphone" | "Laptop & PC" | "AC" | "Refrigerator" | "TV" | "Washing Machine" | "Electrical";
export type ServiceMode = "Home Visit" | "Shop Drop-off";
export type ServiceStatus = "pending" | "approved" | "rejected";
export type BookingStatus = "requested" | "accepted" | "in-progress" | "completed" | "rejected" | "cancelled";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  phone?: string;
  area?: string;
  bio?: string;
  plan?: "free" | "pro";
  createdAt?: string | null;
}

export interface Service {
  _id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: ServiceMode;
  serviceArea: string;
  technicianName: string;
  technicianEmail: string;
  technician?: { name: string; image?: string; area?: string; bio?: string; plan?: "free" | "pro" } | null;
  approvalStatus: ServiceStatus;
  isAvailable: boolean;
  createdAt: string;
}

export interface StatusHistoryItem {
  status: BookingStatus | "paid";
  changedAt: string;
  actor: string;
}

export interface Booking {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  serviceImage: string;
  category?: string;
  basePrice: number;
  finalAmount: number;
  technicianName: string;
  technicianEmail: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  preferredDate: string;
  problemDescription: string;
  status: BookingStatus;
  paymentStatus: "unpaid" | "paid";
  statusHistory?: StatusHistoryItem[];
  createdAt: string;
}

export interface Payment {
  _id?: string;
  bookingId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  technicianName: string;
  technicianEmail: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}
