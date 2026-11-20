"use client";

import { UserRound } from "lucide-react";

export function Avatar({ src, name, size = "md" }: { src?: string | null; name?: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`avatar avatar-${size}`}>
    {src ? <img src={src} alt={name ? `${name} profile` : "Profile"} /> : <UserRound size={size === "lg" ? 23 : 17} />}
  </span>;
}
