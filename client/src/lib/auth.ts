import type { UserRole } from "@/types";

export function dashboardPath(role?: string | null) {
  if (role === "admin" || role === "technician" || role === "customer") return `/dashboard/${role}`;
  return "/dashboard/customer";
}

export function isUserRole(role: unknown): role is UserRole {
  return role === "customer" || role === "technician" || role === "admin";
}

export function roleLabel(role?: string | null) {
  if (role === "admin") return "Admin";
  if (role === "technician") return "Technician";
  return "Customer";
}
