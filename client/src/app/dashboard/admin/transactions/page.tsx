"use client";

import { useEffect, useState } from "react";
import { Download, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Payment } from "@/types";

export default function AdminTransactionsPage(){
 const [payments,setPayments]=useState<Payment[]>([]);const [revenue,setRevenue]=useState(0);const [loading,setLoading]=useState(true);
 useEffect(()=>{apiFetch<{data:Payment[];totalRevenue:number}>("/api/admin/payments",{auth:true}).then((result)=>{setPayments(result.data||[]);setRevenue(result.totalRevenue||0);}).catch((error)=>toast.error(friendlyError(error))).finally(()=>setLoading(false));},[]);
 return <RequireRole roles={["admin"]}><Workspace title="Transactions" subtitle="A ledger of verified Stripe payments. Revenue includes only jobs with a persisted paid record.">
  <div className="dashboard-stats"><StatCard label="Total revenue" value={loading?"—":money(revenue)} icon={ReceiptText} tone="mint"/><StatCard label="Paid transactions" value={loading?"—":payments.length} icon={Download} tone="blue"/></div>
  <div className="dashboard-panel"><div className="panel-heading"><h3>Payment ledger</h3><span className="eyebrow">STRIPE · TEST MODE</span></div>
   {loading?<div className="loading-block"><span className="loader-ring"/></div>:payments.length?<div className="table-scroll"><table className="data-table"><thead><tr><th>Service & booking</th><th>Customer</th><th>Technician</th><th>Transaction ID</th><th>Paid at</th><th>Amount</th><th>Status</th></tr></thead><tbody>{payments.map((payment)=><tr key={payment._id||payment.stripeSessionId}><td><strong>{payment.serviceTitle}</strong><small className="table-subtext">Booking {payment.bookingId}</small></td><td>{payment.customerName}<small className="table-subtext">{payment.customerEmail}</small></td><td>{payment.technicianName}<small className="table-subtext">{payment.technicianEmail}</small></td><td><code className="transaction-code">{payment.transactionId||"—"}</code></td><td>{formatDate(payment.paidAt)}</td><td><strong>{money(payment.amount)}</strong></td><td><StatusBadge status={payment.paymentStatus}/></td></tr>)}</tbody></table></div>:<EmptyState title="No verified payments yet" description="Once a customer pays for a completed repair, the transaction will appear here."/>}
  </div>
 </Workspace></RequireRole>;
}
