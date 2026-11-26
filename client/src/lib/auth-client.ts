"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import type { UserProfile } from "@/types";

// Use the frontend origin so Better Auth cookies remain first-party.
// Next.js rewrites /api/* to the Express API without changing the browser URL.
const authBaseURL = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [jwtClient()],
  fetchOptions: { credentials: "include" }
});

export function useAuth() {
  const state = authClient.useSession();
  type SessionUser = { id: string; name: string; email: string; image?: string | null; plan?: "free" | "pro" } & Partial<UserProfile>;
  const rawUser = state.data?.user as SessionUser | undefined;
  const user = rawUser ? {
    id: String(rawUser.id),
    name: rawUser.name || "FixMate member",
    email: rawUser.email,
    image: rawUser.image || "",
    role: rawUser.role || "customer",
    phone: rawUser.phone || "",
    area: rawUser.area || "",
    bio: rawUser.bio || "",
    plan: rawUser.plan === "pro" ? "pro" : "free"
  } as UserProfile : null;
  return { session: state.data, user, isPending: state.isPending, error: state.error, refetch: state.refetch };
}
