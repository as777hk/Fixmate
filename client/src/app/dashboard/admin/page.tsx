"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, CreditCard, ShieldCheck, Users, Wrench } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Booking, Service } from "@/types";

type Overview = { totalUsers:number; totalTechnicians:number; pendingServices:number; totalRevenue:number; recentBookings:Booking[]; pending:Service[]; revenueChart:{label:string;value:number}[]; bookingChart:{label:string;value:number}[] };
export default function AdminDashboard() {
  const [data,setData]=useState<Overview|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{let active=true;apiFetch<{data:Overview}>("/api/admin/overview",{auth:true}).then((result)=>{if(active)setData(result.data);}).catch((error)=>toast.error(friendlyError(error))).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
  return <RequireRole roles={["admin"]}><Workspace title="Platform overview" subtitle="A live operational view of FixMate services, people and completed payments.">
    <div className="dashboard-stats"><StatCard label="Total users" value={data?.totalUsers??"—"} icon={Users} tone="blue"/><StatCard label="Technicians" value={data?.totalTechnicians??"—"} icon={Wrench} tone="mint"/><StatCard label="Pending reviews" value={data?.pendingServices??"—"} icon={ShieldCheck} tone="amber"/><StatCard label="Platform revenue" value={loading?"—":money(data?.totalRevenue||0)} icon={CreditCard} tone="rose"/></div>
    <div className="dashboard-grid"><RevenueChart title="Paid revenue" data={data?.revenueChart||[]} prefix="$"/><RevenueChart title="Bookings by status" data={data?.bookingChart||[]}/></div>
    <div className="dashboard-grid equal"><section className="dashboard-panel"><div className="panel-heading"><h3>Services waiting for review</h3><Link href="/dashboard/admin/services">Review queue <ArrowUpRight size={13}/></Link></div>{data?.pending?.length?data.pending.slice(0,5).map((service)=><div className="list-row" key={service._id}><div className="booking-thumb"><img src={service.image} alt=""/></div><div className="list-row-main"><strong>{service.title}</strong><small>{service.technicianName} · {service.category}</small></div><StatusBadge status={service.approvalStatus}/></div>):<EmptyState title="No pending services" description="New technician listings will appear here."/>}</section>
    <section className="dashboard-panel"><div className="panel-heading"><h3>Recent repair activity</h3><Link href="/dashboard/admin/bookings">All bookings <ArrowUpRight size={13}/></Link></div>{data?.recentBookings?.length?data.recentBookings.slice(0,5).map((booking)=><div className="list-row" key={booking._id}><div className="list-row-main"><strong>{booking.serviceTitle}</strong><small>{booking.customerName} · {formatDate(booking.createdAt)}</small></div><StatusBadge status={booking.status}/></div>):<EmptyState title="No bookings yet" description="Customer requests will appear here."/>}</section></div>
    <div className="dashboard-panel"><div className="panel-heading"><h3>Administration shortcuts</h3><span className="eyebrow">CONTROL ROOM</span></div><div className="quick-links-grid"><Link href="/dashboard/admin/users"><Users size={18}/> Manage people</Link><Link href="/dashboard/admin/services"><ShieldCheck size={18}/> Moderate services</Link><Link href="/dashboard/admin/bookings"><ClipboardList size={18}/> Inspect bookings</Link><Link href="/dashboard/admin/transactions"><CreditCard size={18}/> Review payments</Link></div></div>
  </Workspace></RequireRole>;
}
