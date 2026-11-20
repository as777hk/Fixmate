"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CreditCard, MapPin, XCircle } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatusBadge } from "@/components/status-badge";
import { BookingTimeline } from "@/components/booking-timeline";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Booking } from "@/types";

export default function CustomerBookingsPage(){
  const [bookings,setBookings]=useState<Booking[]>([]);const [loading,setLoading]=useState(true);const [cancelTarget,setCancelTarget]=useState<string|null>(null);const [busy,setBusy]=useState(false);
  const load=async()=>{try{const result=await apiFetch<{data:Booking[]}>("/api/bookings/my",{auth:true});setBookings(result.data||[]);}catch(error){toast.error(friendlyError(error));}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const cancel=async()=>{if(!cancelTarget)return;setBusy(true);try{await apiFetch(`/api/bookings/${cancelTarget}/cancel`,{method:"PATCH",auth:true});toast.success("Repair request cancelled.");setCancelTarget(null);await load();}catch(error){toast.error(friendlyError(error));}finally{setBusy(false);}};
  const pay=async(bookingId:string)=>{try{const result=await apiFetch<{data:{url:string}}>("/api/payments/create-checkout-session",{method:"POST",auth:true,body:JSON.stringify({bookingId})});if(!result.data?.url)throw new Error("Checkout URL was not returned.");window.location.assign(result.data.url);}catch(error){toast.error(friendlyError(error));}};
  return <RequireRole roles={["customer"]}><Workspace title="My bookings" subtitle="Follow each repair from the first request to the final handover.">
    <div className="dashboard-page-actions"><p>{bookings.length} repair {bookings.length===1?"request":"requests"} in your account</p><Link href="/services" className="button button-primary button-small">Find another service <ArrowUpRight size={14}/></Link></div>
    {loading?<div className="loading-block"><span className="loader-ring"/>Loading bookings…</div>:bookings.length?bookings.map((booking)=><article key={booking._id} className="booking-dashboard-card"><div className="booking-dashboard-head"><div style={{display:"flex",gap:12,alignItems:"center",minWidth:0}}><div className="booking-thumb"><img src={booking.serviceImage} alt=""/></div><div><h3>{booking.serviceTitle}</h3><p>Technician: {booking.technicianName} · Requested {formatDate(booking.createdAt)}</p></div></div><div style={{display:"flex",gap:7,flexWrap:"wrap"}}><StatusBadge status={booking.status}/><StatusBadge status={booking.paymentStatus}/></div></div>
      <div className="booking-dashboard-details"><span><CalendarDays size={13}/> Preferred date<strong>{formatDate(booking.preferredDate)}</strong></span><span><MapPin size={13}/> Service address<strong>{booking.address}</strong></span><span><CreditCard size={13}/> {booking.paymentStatus==="paid"?"Paid amount":"Current amount"}<strong>{money(booking.finalAmount || booking.basePrice)}</strong></span></div>
      <div className="request-note">{booking.problemDescription}</div><BookingTimeline booking={booking}/>
      <div className="booking-dashboard-actions">{booking.status==="requested"&&<button className="table-action danger" onClick={()=>setCancelTarget(booking._id)}><XCircle size={13}/> Cancel request</button>}{booking.status==="completed"&&booking.paymentStatus==="unpaid"&&<button className="button button-primary button-small" onClick={()=>pay(booking._id)}><CreditCard size={14}/> Pay now</button>}{booking.paymentStatus==="paid"&&<span className="status-badge status-success">Payment received</span>}</div>
    </article>):<EmptyState title="Your repair list is clear" description="Once you request a service, you’ll see the technician, date and live progress here." actionLabel="Browse repair services" actionHref="/services"/>}
    <ConfirmDialog open={Boolean(cancelTarget)} title="Cancel this repair request?" description="You can cancel only while the request is still waiting for technician acceptance." confirmLabel="Cancel request" busy={busy} onClose={()=>setCancelTarget(null)} onConfirm={cancel}/>
  </Workspace></RequireRole>;
}
