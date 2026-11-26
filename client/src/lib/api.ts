"use client";

import { authClient } from "./auth-client";

// Use the frontend first-party API proxy; Next.js rewrites /api/* to Express.
const API_URL = "";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) { super(message); this.name = "ApiError"; this.status = status; }
}

type ApiOptions = RequestInit & { auth?: boolean };

export async function apiFetch<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = false, ...init } = options;
  const headers = new Headers(init.headers || {});
  const isForm = typeof FormData !== "undefined" && init.body instanceof FormData;
  if (init.body && !isForm && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (auth) {
    const tokenResult = await authClient.token();
    const token = tokenResult.data?.token;
    if (!token) throw new ApiError(tokenResult.error?.message || "Your session has expired. Please sign in again.", 401);
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`${API_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(payload?.message || `Request failed (${response.status}).`, response.status);
  return payload as T;
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const result = await apiFetch<{ success: boolean; data: { url: string } }>("/api/uploads/image", { method: "POST", body: form, auth: true });
  return result.data.url;
}

export function money(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));
}

export function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export function friendlyError(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
