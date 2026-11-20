"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Booking } from "@/types";

const filters=["all","requested","accepted","in-progress","completed","rejected","cancelled"];
export default function AdminBookingsPage(){
 const [bookings,setBookings]=useState<Booking[]>([]);const [filter,setFilter]=useState("all");const [loading,setLoading]=useState(true);
 useEffect(()=>{let active=true;const query=filter==="all"?"":`?status=${filter}`;apiFetch<{data:Booking[]}>(`/api/admin/bookings${query}`,{auth:true}).then((result)=>{if(active)setBookings(result.data||[]);}).catch((error)=>toast.error(friendlyError(error))).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[filter]);
 return <RequireRole roles={["admin"]}><Workspace title="All bookings" subtitle="Read-only oversight of every repair request across the platform.">
  <div className="dashboard-page-actions"><p>{bookings.length} bookings in this view</p><div className="filter-tabs">{filters.map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>{setLoading(true);setFilter(item);}}>{item==="all"?"All":item.replace("-"," ")}</button>)}</div></div>
  {loading?<div className="loading-block"><span className="loader-ring"/></div>:bookings.length?<div className="dashboard-panel"><div className="table-scroll"><table className="data-table"><thead><tr><th>Repair</th><th>Customer</th><th>Technician</th><th>Preferred date</th><th>Job status</th><th>Payment</th><th>Amount</th></tr></thead><tbody>{bookings.map((booking)=><tr key={booking._id}><td><strong>{booking.serviceTitle}</strong><small className="table-subtext">{booking.category||"Repair"}</small></td><td>{booking.customerName}<small className="table-subtext">{booking.customerEmail}</small></td><td>{booking.technicianName}<small className="table-subtext">{booking.technicianEmail}</small></td><td>{formatDate(booking.preferredDate)}</td><td><StatusBadge status={booking.status}/></td><td><StatusBadge status={booking.paymentStatus}/></td><td>{money(booking.finalAmount||booking.basePrice)}</td></tr>)}</tbody></table></div></div>:<EmptyState title="No bookings match this filter" description="Choose another job status or wait for new repair requests." icon={ClipboardList}/>}
 </Workspace></RequireRole>;
}
