"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import type { UserProfile } from "@/types";

const authBaseURL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [jwtClient()],
  fetchOptions: { credentials: "include" }
});

export function useAuth() {
  const state = authClient.useSession();
  type SessionUser = { id: string; name: string; email: string; image?: string | null } & Partial<UserProfile>;
  const rawUser = state.data?.user as SessionUser | undefined;
  const user = rawUser ? {
    id: String(rawUser.id),
    name: rawUser.name || "FixMate member",
    email: rawUser.email,
    image: rawUser.image || "",
    role: rawUser.role || "customer",
    phone: rawUser.phone || "",
    area: rawUser.area || "",
    bio: rawUser.bio || ""
  } as UserProfile : null;
  return { session: state.data, user, isPending: state.isPending, error: state.error, refetch: state.refetch };
}
