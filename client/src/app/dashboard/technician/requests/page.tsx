"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatusBadge } from "@/components/status-badge";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Booking, BookingStatus } from "@/types";

const filters=["all","requested","accepted","in-progress","completed","rejected","cancelled"];
export default function TechnicianRequestsPage(){
 const [bookings,setBookings]=useState<Booking[]>([]);const [filter,setFilter]=useState("all");const [loading,setLoading]=useState(true);const [rejectTarget,setRejectTarget]=useState<Booking|null>(null);const [completeTarget,setCompleteTarget]=useState<Booking|null>(null);const [amount,setAmount]=useState("");const [busy,setBusy]=useState(false);
 const load=async()=>{try{const query=filter==="all"?"":`?status=${encodeURIComponent(filter)}`;const result=await apiFetch<{data:Booking[]}>(`/api/bookings/technician${query}`,{auth:true});setBookings(result.data||[]);}catch(error){toast.error(friendlyError(error));}finally{setLoading(false);}};
 useEffect(()=>{setLoading(true);load();},[filter]);
 const move=async(booking:Booking,status:BookingStatus,finalAmount?:number)=>{setBusy(true);try{await apiFetch(`/api/bookings/${booking._id}/status`,{method:"PATCH",auth:true,body:JSON.stringify({status,...(finalAmount?{finalAmount}: {})})});toast.success(`Booking moved to ${status}.`);setRejectTarget(null);setCompleteTarget(null);await load();}catch(error){toast.error(friendlyError(error));}finally{setBusy(false);}};
 const markComplete=async(event:React.FormEvent)=>{event.preventDefault();if(!completeTarget)return;const value=Number(amount);if(!Number.isFinite(value)||value<=0){toast.error("Enter a final amount greater than zero.");return;}await move(completeTarget,"completed",value);};
 return <RequireRole roles={["technician"]}><Workspace title="Repair requests" subtitle="Only your assigned service bookings appear here. Move each repair through its valid next step.">
  <div className="dashboard-page-actions"><p>{bookings.length} requests in this view</p><div className="filter-tabs">{filters.map((status)=><button key={status} className={filter===status?"active":""} onClick={()=>setFilter(status)}>{status==="all"?"All":status.replace("-"," ")}</button>)}</div></div>
  {loading?<div className="loading-block"><span className="loader-ring"/></div>:bookings.length?bookings.map((booking)=><article className="booking-dashboard-card" key={booking._id}><div className="booking-dashboard-head"><div><h3>{booking.serviceTitle}</h3><p>{booking.customerName} · {booking.customerEmail}</p></div><StatusBadge status={booking.status}/></div><div className="booking-dashboard-details"><span>PHONE<strong>{booking.customerPhone}</strong></span><span>REQUESTED DATE<strong>{formatDate(booking.preferredDate)}</strong></span><span>STARTING PRICE<strong>{money(booking.basePrice)}</strong></span></div><div className="request-note"><strong>Problem description</strong><br/>{booking.problemDescription}<br/><br/><strong>Service address</strong><br/>{booking.address}</div><div className="booking-dashboard-actions">
    {booking.status==="requested"&&<><button className="button button-primary button-small" onClick={()=>move(booking,"accepted")} disabled={busy}><Check size={14}/> Accept request</button><button className="table-action danger" onClick={()=>setRejectTarget(booking)}><X size={14}/> Reject</button></>}
    {booking.status==="accepted"&&<button className="button button-primary button-small" onClick={()=>move(booking,"in-progress")} disabled={busy}><Clock3 size={14}/> Start work</button>}
    {booking.status==="in-progress"&&<button className="button button-primary button-small" onClick={()=>{setCompleteTarget(booking);setAmount(String(booking.basePrice));}}><Check size={14}/> Mark completed</button>}
    {booking.status==="completed"&&<span className="status-badge status-success">Final amount: {money(booking.finalAmount)} · {booking.paymentStatus}</span>}
    {booking.status==="rejected"||booking.status==="cancelled"?<span style={{color:"var(--muted)",fontSize:9}}>This request is closed.</span>:null}
  </div></article>):<EmptyState title="No repair requests in this view" description="New customer requests for your services will appear here." actionLabel="View my services" actionHref="/dashboard/technician/my-services"/>}
  <ConfirmDialog open={Boolean(rejectTarget)} title="Reject this repair request?" description="The customer will see that the request was rejected. This action cannot be reversed." confirmLabel="Reject request" busy={busy} onClose={()=>setRejectTarget(null)} onConfirm={()=>rejectTarget&&move(rejectTarget,"rejected")}/>
  {completeTarget&&<div className="dialog-backdrop"><form className="confirm-dialog" onSubmit={markComplete}><h2>Complete the repair</h2><p>Enter the final amount. The customer can pay only after this status update is saved.</p><div className="field" style={{marginTop:18}}><label htmlFor="final-amount">Final amount (USD)</label><input id="final-amount" type="number" min="0.01" step="0.01" required value={amount} onChange={(e)=>setAmount(e.target.value)}/><small>Starting price: {money(completeTarget.basePrice)}</small></div><div className="dialog-actions"><button type="button" className="button button-quiet" onClick={()=>setCompleteTarget(null)}>Go back</button><button className="button button-primary" disabled={busy}>{busy?"Saving…":"Confirm completion"}</button></div></form></div>}
 </Workspace></RequireRole>;
}
