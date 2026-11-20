"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/auth-client";
import { dashboardPath, roleLabel } from "@/lib/auth";
import type { UserRole } from "@/types";

export function RequireRole({ roles, children }: { roles?: UserRole[]; children: React.ReactNode }) {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isPending && !user) router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
  }, [isPending, user, router, pathname]);
  if (isPending || !user) return <div className="auth-route-loader"><span className="loader-ring"/><p>Restoring your workspace…</p></div>;
  if (roles && !roles.includes(user.role)) return <div className="forbidden-page"><span><ShieldAlert size={28}/></span><h1>This workspace isn't yours.</h1><p>You are signed in as a {roleLabel(user.role)}. Your account does not have access to this area.</p><Link className="button button-primary" href={dashboardPath(user.role)}>Go to your dashboard</Link></div>;
  return <>{children}</>;
}
