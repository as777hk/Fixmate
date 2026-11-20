"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ClipboardList, CreditCard, Gauge, Plus, Settings, ShieldCheck, Users, Wrench } from "lucide-react";
import type { UserRole } from "@/types";

const navItems = {
  customer: [{ href: "/dashboard/customer", label: "Overview", icon: Gauge }, { href: "/dashboard/customer/bookings", label: "My bookings", icon: ClipboardList }, { href: "/dashboard/customer/payments", label: "Payments", icon: CreditCard }],
  technician: [{ href: "/dashboard/technician", label: "Overview", icon: Gauge }, { href: "/dashboard/technician/add-service", label: "Add a service", icon: Plus }, { href: "/dashboard/technician/my-services", label: "My services", icon: Wrench }, { href: "/dashboard/technician/requests", label: "Repair requests", icon: ClipboardList }],
  admin: [{ href: "/dashboard/admin", label: "Overview", icon: Gauge }, { href: "/dashboard/admin/users", label: "Users & roles", icon: Users }, { href: "/dashboard/admin/services", label: "Service review", icon: ShieldCheck }, { href: "/dashboard/admin/bookings", label: "All bookings", icon: ClipboardList }, { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard }]
};
export function DashboardNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  return <nav className="dashboard-nav"><span className="dashboard-nav-caption">WORKSPACE</span>{navItems[role].map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href ? "dashboard-nav-link active" : "dashboard-nav-link"}><Icon size={18}/><span>{label}</span>{pathname === href && <Activity size={13} className="nav-active-mark"/>}</Link>)}<span className="dashboard-nav-caption dashboard-nav-bottom-caption">ACCOUNT</span><Link href="/dashboard/profile" className={pathname === "/dashboard/profile" ? "dashboard-nav-link active" : "dashboard-nav-link"}><Settings size={18}/><span>Profile settings</span></Link></nav>;
}
