"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ClipboardList, DollarSign, Plus, ShieldCheck, Wrench } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, friendlyError, money } from "@/lib/api";
import { useAuth } from "@/lib/auth-client";

type Stats={totalServices:number;approvedServices:number;pendingRequests:number;totalEarnings:number;jobChart:{label:string;value:number}[];earningsChart:{label:string;value:number}[]};
export default function TechnicianDashboard(){
  const { user, refetch } = useAuth();
  const [upgrading,setUpgrading]=useState(false);
  const [stats,setStats]=useState<Stats|null>(null);const [loading,setLoading]=useState(true);
  useEffect(()=>{apiFetch<{data:Stats}>("/api/dashboard/technician-stats",{auth:true}).then((result)=>setStats(result.data)).catch((error)=>toast.error(friendlyError(error))).finally(()=>setLoading(false));},[]);
  useEffect(()=>{
    const url=new URL(window.location.href);
    const sessionId=url.searchParams.get("plan_session_id");
    if(url.searchParams.get("plan_cancelled")) toast.info("Your checkout was cancelled. Your current plan is unchanged.");
    if(!sessionId) return;
    let active=true;
    apiFetch<{data:{plan:string}}>(`/api/payments/verify-pro?session_id=${encodeURIComponent(sessionId)}`,{auth:true})
      .then(()=>{if(active){toast.success("FixMate Pro is now active. Your service limit has been removed.");void refetch();}})
      .catch(error=>{if(active)toast.error(friendlyError(error));})
      .finally(()=>{if(active){url.searchParams.delete("plan_session_id");url.searchParams.delete("plan_cancelled");window.history.replaceState({}, "", url.pathname+url.search);}});
    return ()=>{active=false;};
  },[]);
  const upgrade=async()=>{
    setUpgrading(true);
    try{
      const result=await apiFetch<{data:{url:string}}>("/api/payments/create-pro-checkout-session",{method:"POST",auth:true});
      if(!result.data?.url) throw new Error("Secure checkout could not be started.");
      window.location.assign(result.data.url);
    }catch(error){toast.error(friendlyError(error));setUpgrading(false);}
  };
  return <RequireRole roles={["technician"]}><Workspace title="Technician overview" subtitle="Manage your listings, incoming work and completed repair earnings.">
    <div className="dashboard-page-actions"><p>Keep your service catalogue current and respond to requests promptly.</p><Link className="button button-primary button-small" href="/dashboard/technician/add-service"><Plus size={14}/> Add service</Link></div>
    <div className="dashboard-stats"><StatCard label="Total services" value={stats?.totalServices??"—"} icon={Wrench} tone="blue"/><StatCard label="Approved listings" value={stats?.approvedServices??"—"} icon={BadgeCheck} tone="mint"/><StatCard label="New requests" value={stats?.pendingRequests??"—"} icon={ClipboardList} tone="amber"/><StatCard label="Paid earnings" value={loading?"—":money(stats?.totalEarnings||0)} icon={DollarSign} tone="rose"/></div>
    <section className="dashboard-panel pro-plan-panel">
      <div className="pro-plan-copy">
        <span className="eyebrow">TECHNICIAN MEMBERSHIP</span>
        <h3>FixMate Pro</h3>
        <p>{user?.plan==="pro" ? "Your profile is marked as a Verified Pro technician, and you can publish unlimited service listings." : "Start with up to 3 service listings. Upgrade once for unlimited listings and a Verified Pro profile badge."}</p>
      </div>
      <div className="pro-plan-action">
        {user?.plan==="pro" ? <span className="verified-pro-badge"><ShieldCheck size={15}/> Verified Pro active</span> : <><strong>$29 <small>one-time upgrade</small></strong><button className="button button-primary button-small" onClick={upgrade} disabled={upgrading}>{upgrading?"Opening secure checkout…":"Upgrade to Pro"} <ArrowUpRight size={14}/></button></>}
      </div>
    </section>
    <div className="dashboard-grid"><RevenueChart title="Paid earnings by month" data={stats?.earningsChart||[]} prefix="$"/><RevenueChart title="Repair jobs by status" data={stats?.jobChart||[]}/></div>
    <div className="dashboard-grid equal"><section className="dashboard-panel"><div className="panel-heading"><h3>Service management</h3><Link href="/dashboard/technician/my-services">Manage all <ArrowUpRight size={13}/></Link></div><p style={{color:"var(--muted)",fontSize:10,lineHeight:1.8}}>New services and edits are sent to the admin review queue. Only approved and available services are visible to customers.</p><Link className="button button-quiet button-small" href="/dashboard/technician/my-services">Open my services</Link></section><section className="dashboard-panel"><div className="panel-heading"><h3>Repair requests</h3><Link href="/dashboard/technician/requests">Open queue <ArrowUpRight size={13}/></Link></div><div className="process-card" style={{padding:16}}><span className="process-icon"><ClipboardList size={18}/></span><h3>One action at a time.</h3><p>Accept or reject a request, start the work, then set the final amount when the repair is complete.</p><Link className="service-detail-link" href="/dashboard/technician/requests" style={{marginTop:12}}>View repair queue <ArrowUpRight size={14}/></Link></div></section></div>
  </Workspace></RequireRole>;
}
