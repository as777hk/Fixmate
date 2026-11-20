"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, CreditCard, Download, MapPin, XCircle } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatusBadge } from "@/components/status-badge";
import { BookingTimeline } from "@/components/booking-timeline";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Booking } from "@/types";
import { ReviewForm } from "@/components/review-form";

export default function CustomerBookingsPage(){
  const [bookings,setBookings]=useState<Booking[]>([]);const [loading,setLoading]=useState(true);const [cancelTarget,setCancelTarget]=useState<string|null>(null);const [busy,setBusy]=useState(false);const [filter,setFilter]=useState("all");
  const load=async()=>{try{const result=await apiFetch<{data:Booking[]}>("/api/bookings/my",{auth:true});setBookings(result.data||[]);}catch(error){toast.error(friendlyError(error));}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const cancel=async()=>{if(!cancelTarget)return;setBusy(true);try{await apiFetch(`/api/bookings/${cancelTarget}/cancel`,{method:"PATCH",auth:true});toast.success("Repair request cancelled.");setCancelTarget(null);await load();}catch(error){toast.error(friendlyError(error));}finally{setBusy(false);}};
  const pay=async(bookingId:string)=>{try{const result=await apiFetch<{data:{url:string}}>("/api/payments/create-checkout-session",{method:"POST",auth:true,body:JSON.stringify({bookingId})});if(!result.data?.url)throw new Error("Checkout URL was not returned.");window.location.assign(result.data.url);}catch(error){toast.error(friendlyError(error));}};
  const downloadInvoice=async(booking:Booking)=>{
    try{
      const { jsPDF } = await import("jspdf");
      const pdf=new jsPDF();
      const ticket=booking.ticketNo || ("FM-"+booking._id.slice(-6).toUpperCase());
      pdf.setFont("helvetica","bold");pdf.setFontSize(22);pdf.text("FixMate",18,22);
      pdf.setFont("helvetica","normal");pdf.setFontSize(9);pdf.text("REPAIR SERVICE PAYMENT RECEIPT",18,30);
      pdf.setFont("courier","bold");pdf.setFontSize(10);pdf.text(ticket,150,22);
      pdf.setDrawColor(220,226,235);pdf.line(18,37,192,37);
      pdf.setFont("helvetica","bold");pdf.setFontSize(13);pdf.text("Payment confirmed",18,50);
      pdf.setFont("helvetica","normal");pdf.setFontSize(10);
      const rows=[
        ["Service",booking.serviceTitle],
        ["Category",booking.category||"Repair service"],
        ["Customer",booking.customerName],
        ["Technician",booking.technicianName],
        ["Service address",booking.address],
        ["Preferred date",formatDate(booking.preferredDate)],
        ["Completed on",formatDate(booking.updatedAt||booking.createdAt)],
        ["Payment status","Paid"],
        ["Stripe transaction",booking.paymentTransactionId||"Not returned"],
        ["Total paid",money(booking.finalAmount||booking.basePrice)]
      ];
      let y=65;
      for(const [label,value] of rows){pdf.setFont("helvetica","bold");pdf.text(label,18,y);pdf.setFont("helvetica","normal");const lines=pdf.splitTextToSize(String(value||"—"),112);pdf.text(lines,75,y);y+=Math.max(9,lines.length*5)+4;}
      pdf.setDrawColor(220,226,235);pdf.line(18,y+2,192,y+2);
      pdf.setFontSize(8);pdf.setTextColor(100);pdf.text("Thank you for choosing FixMate. This receipt confirms the payment recorded for the repair above.",18,y+12);
      pdf.save(`FixMate-${ticket}-receipt.pdf`);
    }catch(error){toast.error(friendlyError(error));}
  };
  const counts={
    all:bookings.length,
    active:bookings.filter((item)=>["requested","accepted","in-progress"].includes(item.status)).length,
    toPay:bookings.filter((item)=>item.status==="completed"&&item.paymentStatus==="unpaid").length,
    paid:bookings.filter((item)=>item.paymentStatus==="paid").length,
    closed:bookings.filter((item)=>["rejected","cancelled"].includes(item.status)).length
  };
  const visibleBookings=bookings.filter((item)=>{
    if(filter==="active")return ["requested","accepted","in-progress"].includes(item.status);
    if(filter==="toPay")return item.status==="completed"&&item.paymentStatus==="unpaid";
    if(filter==="paid")return item.paymentStatus==="paid";
    if(filter==="closed")return ["rejected","cancelled"].includes(item.status);
    return true;
  });
  return <RequireRole roles={["customer"]}><Workspace title="My bookings" subtitle="Follow each repair from the first request to the final handover.">
    <div className="dashboard-page-actions"><p>{bookings.length} repair {bookings.length===1?"request":"requests"} in your account</p><Link href="/services" className="button button-primary button-small">Find another service <ArrowUpRight size={14}/></Link></div>
    <div className="booking-filter-tabs">{[["all","All"],["active","Active"],["toPay","To pay"],["paid","Paid"],["closed","Closed"]].map(([key,label])=><button key={key} className={filter===key?"active":""} onClick={()=>setFilter(key)}>{label}<span>{counts[key as keyof typeof counts]}</span></button>)}</div>
    {loading?<div className="loading-block"><span className="loader-ring"/>Loading bookings…</div>:visibleBookings.length?visibleBookings.map((booking)=><article key={booking._id} className="booking-dashboard-card"><div className="booking-dashboard-head"><div style={{display:"flex",gap:12,alignItems:"center",minWidth:0}}><div className="booking-thumb"><img src={booking.serviceImage} alt=""/></div><div><h3>{booking.serviceTitle}</h3><p><span className="ticket-number">{booking.ticketNo||("FM-"+booking._id.slice(-6).toUpperCase())}</span> · Technician: {booking.technicianName} · Requested {formatDate(booking.createdAt)}</p></div></div><div style={{display:"flex",gap:7,flexWrap:"wrap"}}><StatusBadge status={booking.status}/><StatusBadge status={booking.paymentStatus}/></div></div>
      <div className="booking-dashboard-details"><span><CalendarDays size={13}/> Preferred date<strong>{formatDate(booking.preferredDate)}</strong></span><span><MapPin size={13}/> Service address<strong>{booking.address}</strong></span><span><CreditCard size={13}/> {booking.paymentStatus==="paid"?"Paid amount":"Current amount"}<strong>{money(booking.finalAmount || booking.basePrice)}</strong></span></div>
      <div className="request-note">{booking.problemDescription}</div><BookingTimeline booking={booking}/>
      <div className="booking-dashboard-actions">{booking.status==="requested"&&<button className="table-action danger" onClick={()=>setCancelTarget(booking._id)}><XCircle size={13}/> Cancel request</button>}{booking.status==="completed"&&booking.paymentStatus==="unpaid"&&<button className="button button-primary button-small" onClick={()=>pay(booking._id)}><CreditCard size={14}/> Pay now</button>}{booking.paymentStatus==="paid"&&<><span className="status-badge status-success">Payment received</span><button className="button button-quiet button-small" onClick={()=>downloadInvoice(booking)}><Download size={13}/> Download invoice</button></>}</div>
      {booking.paymentStatus==="paid" && !booking.rating && <ReviewForm bookingId={booking._id} onSubmitted={load}/>}
      {booking.rating && <div className="saved-review"><strong>Your review</strong><span>{"★".repeat(booking.rating)}{"☆".repeat(5-booking.rating)}</span><p>{booking.review}</p></div>}
    </article>):<EmptyState title={filter==="all"?"Your repair list is clear":"No repairs in this view"} description="Once you request a service, you’ll see the technician, date and live progress here." actionLabel="Browse repair services" actionHref="/services"/>}
    <ConfirmDialog open={Boolean(cancelTarget)} title="Cancel this repair request?" description="You can cancel only while the request is still waiting for technician acceptance." confirmLabel="Cancel request" busy={busy} onClose={()=>setCancelTarget(null)} onConfirm={cancel}/>
  </Workspace></RequireRole>;
}
