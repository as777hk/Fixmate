"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import { useAuth } from "@/lib/auth-client";
import type { Payment } from "@/types";

function PaymentSuccess(){
  const params=useSearchParams();const {user,isPending}=useAuth();const [payment,setPayment]=useState<Payment|null>(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{const sessionId=params.get("session_id");if(!sessionId||isPending)return;if(!user){setLoading(false);return;}let alive=true;apiFetch<{data:Payment}>(`/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`,{auth:true}).then((result)=>{if(alive)setPayment(result.data);}).catch((error)=>{if(alive)toast.error(friendlyError(error));}).finally(()=>{if(alive)setLoading(false);});return()=>{alive=false;};},[params,user,isPending]);
  if(loading||isPending)return <div className="payment-result"><div className="loading-block"><span className="loader-ring"/>Verifying your payment…</div></div>;
  if(!payment)return <div className="payment-result"><div className="payment-result-card"><span className="payment-result-icon"><ReceiptText size={26}/></span><h1>Payment verification</h1><p>Sign in with the customer account used for this booking to view its receipt.</p><Link className="button button-primary" href="/sign-in?callbackUrl=%2Fdashboard%2Fcustomer%2Fbookings" style={{marginTop:22}}>Sign in to continue</Link></div></div>;
  const print=()=>window.print();
  return <div className="payment-result"><div className="payment-result-card"><span className="payment-result-icon"><CheckCircle2 size={29}/></span><span className="eyebrow">PAYMENT CONFIRMED</span><h1>All settled. Thank you.</h1><p>Your repair payment has been verified and recorded.</p><div className="receipt-list"><div className="receipt-row"><span>Service</span><strong>{payment.serviceTitle}</strong></div><div className="receipt-row"><span>Amount paid</span><strong>{money(payment.amount)}</strong></div><div className="receipt-row"><span>Technician</span><strong>{payment.technicianName}</strong></div><div className="receipt-row"><span>Transaction</span><strong>{payment.transactionId || payment.stripeSessionId}</strong></div><div className="receipt-row"><span>Paid on</span><strong>{formatDate(payment.paidAt)}</strong></div></div><div className="booking-dashboard-actions" style={{justifyContent:"center"}}><button className="button button-quiet" onClick={print}><Download size={15}/> Save receipt</button><Link className="button button-primary" href="/dashboard/customer/bookings">Back to my bookings</Link></div><p style={{marginTop:16,fontSize:9}}>Use your browser’s print dialog to save this receipt as a PDF.</p></div></div>;
}
export default function PaymentSuccessPage(){return <Suspense fallback={<div className="loading-block"><span className="loader-ring"/></div>}><PaymentSuccess/></Suspense>;}
