"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight, CalendarClock, CheckCircle2, ClipboardList, DollarSign, Wrench } from "lucide-react";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { BookingTimeline } from "@/components/booking-timeline";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, money } from "@/lib/api";
import type { Booking } from "@/types";

type Stats = { totalRequests:number; activeJobs:number; completedJobs:number; totalSpent:number; unpaidJobs:number; recentBookings:Booking[]; chart:{label:string;value:number}[] };
export default function CustomerDashboard(){
  const [stats,setStats]=useState<Stats|null>(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{let alive=true;apiFetch<{data:Stats}>("/api/dashboard/customer-stats",{auth:true}).then((result)=>{if(alive)setStats(result.data);}).catch(()=>{if(alive)setStats(null);}).finally(()=>{if(alive)setLoading(false);});return()=>{alive=false;};},[]);
  return <RequireRole roles={["customer"]}><Workspace title="Your repair overview" subtitle="A clear view of every request, active job and completed repair.">
    <div className="dashboard-stats"><StatCard label="Total requests" value={stats?.totalRequests??"—"} hint="All repair requests" icon={ClipboardList} tone="blue"/><StatCard label="Active jobs" value={stats?.activeJobs??"—"} hint="Moving through the workflow" icon={Activity} tone="amber"/><StatCard label="Completed jobs" value={stats?.completedJobs??"—"} hint="Repairs marked complete" icon={CheckCircle2} tone="mint"/><StatCard label="Total spent" value={loading?"—":money(stats?.totalSpent||0)} hint="Verified Stripe payments" icon={DollarSign} tone="rose"/></div>
    {Boolean(stats?.unpaidJobs) && <div className="unpaid-alert"><div><strong>{stats?.unpaidJobs} completed repair{stats?.unpaidJobs===1?"":"s"} ready for payment</strong><p>Review the final amount and complete checkout from your bookings.</p></div><Link href="/dashboard/customer/bookings">Review and pay <ArrowUpRight size={14}/></Link></div>}
    <div className="dashboard-grid"><RevenueChart title="Your booking activity" data={stats?.chart||[]}/><section className="dashboard-panel"><div className="panel-heading"><h3>Keep things moving</h3></div><div className="process-card" style={{padding:18}}><span className="process-icon"><CalendarClock size={19}/></span><h3>Next step, always visible.</h3><p>Open a booking to see its timeline, contact details and whether payment is ready.</p><Link href="/dashboard/customer/bookings" className="service-detail-link" style={{marginTop:15}}>View my bookings <ArrowUpRight size={14}/></Link></div></section></div>
    <section className="dashboard-panel"><div className="panel-heading"><h3>Recent repair requests</h3><Link href="/dashboard/customer/bookings">All bookings <ArrowUpRight size={14}/></Link></div>{loading?<div className="loading-block"><span className="loader-ring"/></div>:stats?.recentBookings?.length?<div className="booking-list">{stats.recentBookings.map((booking)=><div className="booking-row" key={booking._id}><div className="booking-thumb"><img src={booking.serviceImage} alt=""/></div><div className="booking-row-copy"><strong>{booking.serviceTitle}</strong><small>{booking.technicianName} · {formatDate(booking.preferredDate)}</small></div><div className="booking-row-end"><span className={`status-badge status-${booking.status==="completed"?"success":booking.status==="requested"?"info":"warning"}`}>{booking.status}</span><small>{booking.paymentStatus}</small></div></div>)}</div>:<EmptyState title="No repair requests yet" description="Find a service and send your first repair request." actionLabel="Browse services" actionHref="/services"/>}</section>
  </Workspace></RequireRole>;
}
