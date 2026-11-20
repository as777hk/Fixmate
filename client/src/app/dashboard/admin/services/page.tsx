"use client";

import { useEffect, useState } from "react";
import { Check, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { StatusBadge } from "@/components/status-badge";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, friendlyError, money } from "@/lib/api";
import type { Service, ServiceStatus } from "@/types";

const options=["all","pending","approved","rejected"] as const;
export default function AdminServicesPage(){
 const [services,setServices]=useState<Service[]>([]);const [filter,setFilter]=useState<(typeof options)[number]>("pending");const [loading,setLoading]=useState(true);const [target,setTarget]=useState<{service:Service;status:"approved"|"rejected"}|null>(null);const [busy,setBusy]=useState(false);
 const load=async()=>{try{const query=filter==="all"?"":`?approvalStatus=${filter}`;const result=await apiFetch<{data:Service[]}>(`/api/admin/services${query}`,{auth:true});setServices(result.data||[]);}catch(error){toast.error(friendlyError(error));}finally{setLoading(false);}};
 useEffect(()=>{setLoading(true);load();},[filter]);
 const moderate=async()=>{if(!target)return;setBusy(true);try{await apiFetch(`/api/admin/services/${target.service._id}/approval`,{method:"PATCH",auth:true,body:JSON.stringify({approvalStatus:target.status})});toast.success(`Service ${target.status}.`);setTarget(null);await load();}catch(error){toast.error(friendlyError(error));}finally{setBusy(false);}};
 return <RequireRole roles={["admin"]}><Workspace title="Service review" subtitle="Every public listing passes through a human approval step.">
  <div className="dashboard-page-actions"><p>{services.length} listings in this review view</p><div className="filter-tabs">{options.map((item)=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item==="all"?"All":item[0].toUpperCase()+item.slice(1)}</button>)}</div></div>
  {loading?<div className="loading-block"><span className="loader-ring"/></div>:services.length?<div className="dashboard-panel"><div className="table-scroll"><table className="data-table"><thead><tr><th>Service</th><th>Technician</th><th>Mode & area</th><th>Starting price</th><th>Review status</th><th>Decision</th></tr></thead><tbody>{services.map((service)=><tr key={service._id}><td><div className="table-person"><div className="booking-thumb"><img src={service.image} alt=""/></div><span><strong>{service.title}</strong><small>{service.category}</small></span></div></td><td>{service.technicianName}<small className="table-subtext">{service.technicianEmail}</small></td><td>{service.serviceMode}<small className="table-subtext">{service.serviceArea}</small></td><td>{money(service.basePrice)}</td><td><StatusBadge status={service.approvalStatus}/></td><td><div className="table-actions">{service.approvalStatus!=="approved"&&<button className="table-action" onClick={()=>setTarget({service,status:"approved"})}><Check size={13}/> Approve</button>}{service.approvalStatus!=="rejected"&&<button className="table-action danger" onClick={()=>setTarget({service,status:"rejected"})}><X size={13}/> Reject</button>}<a className="table-action" href={service.image} target="_blank" rel="noreferrer" aria-label="Open service image"><ExternalLink size={13}/></a></div></td></tr>)}</tbody></table></div></div>:<EmptyState title="No services in this queue" description="Try another approval filter, or check back when a technician submits a listing."/>}
  <ConfirmDialog open={Boolean(target)} title={target?.status==="approved"?"Approve this service?":"Reject this service?"} description={target?.status==="approved"?"The listing will become visible to customers when it is available.":"The technician will see that this listing was rejected and can revise it."} confirmLabel={target?.status==="approved"?"Approve service":"Reject service"} danger={target?.status!=="approved"} busy={busy} onClose={()=>setTarget(null)} onConfirm={moderate}/>
 </Workspace></RequireRole>;
}
