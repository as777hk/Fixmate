"use client";

import { useEffect, useState } from "react";
import { ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { DataTable, type Column } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import type { Payment } from "@/types";
export default function CustomerPaymentsPage(){
  const [payments,setPayments]=useState<Payment[]>([]);const [loading,setLoading]=useState(true);
  useEffect(()=>{apiFetch<{data:Payment[]}>("/api/payments/my",{auth:true}).then((result)=>setPayments(result.data||[])).catch((error)=>toast.error(friendlyError(error))).finally(()=>setLoading(false));},[]);
  const columns:Column<Payment>[]=[{key:"serviceTitle",label:"Service"},{key:"technicianName",label:"Technician"},{key:"amount",label:"Amount",render:(row)=>money(row.amount)},{key:"transactionId",label:"Transaction",render:(row)=><span title={row.transactionId}>{row.transactionId?.slice(0,17)||"—"}</span>},{key:"paidAt",label:"Payment date",render:(row)=>formatDate(row.paidAt)},{key:"paymentStatus",label:"Status",render:(row)=><StatusBadge status={row.paymentStatus}/> }];
  return <RequireRole roles={["customer"]}><Workspace title="Payment history" subtitle="A record of every completed repair payment in your account."><section className="dashboard-panel"><div className="panel-heading"><h3>Transactions</h3><span className="status-badge status-success"><ReceiptText size={12}/> Verified payments</span></div>{loading?<div className="loading-block"><span className="loader-ring"/></div>:payments.length?<DataTable columns={columns} rows={payments}/>:<EmptyState title="No payments recorded" description="When a completed repair is paid, its receipt will appear here." actionLabel="View my bookings" actionHref="/dashboard/customer/bookings"/>}</section></Workspace></RequireRole>;
}
