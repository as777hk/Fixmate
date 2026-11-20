"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard } from "lucide-react";
function Cancelled(){const params=useSearchParams();const booking=params.get("booking_id");return <div className="payment-result"><div className="payment-result-card"><span className="payment-result-icon" style={{color:"#a16b29",background:"#fbf1dd"}}><CreditCard size={27}/></span><span className="eyebrow">CHECKOUT CANCELLED</span><h1>No payment was taken.</h1><p>Your repair remains completed and unpaid. You can return to your bookings and try again when ready.</p><Link className="button button-primary" href="/dashboard/customer/bookings" style={{marginTop:22}}><ArrowLeft size={15}/> Back to my bookings</Link>{booking&&<p style={{marginTop:15,fontSize:9}}>Booking reference: {booking}</p>}</div></div>}
export default function PaymentCancelPage(){return <Suspense fallback={<div className="loading-block"><span className="loader-ring"/></div>}><Cancelled/></Suspense>}
