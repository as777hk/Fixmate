"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { Avatar } from "@/components/avatar";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError } from "@/lib/api";
import { useAuth } from "@/lib/auth-client";
import type { UserProfile, UserRole } from "@/types";

export default function AdminUsersPage(){
 const {user:admin}=useAuth();const [users,setUsers]=useState<UserProfile[]>([]);const [loading,setLoading]=useState(true);const [saving,setSaving]=useState<string|null>(null);
 const load=async()=>{try{const result=await apiFetch<{data:UserProfile[]}>("/api/admin/users",{auth:true});setUsers(result.data||[]);}catch(error){toast.error(friendlyError(error));}finally{setLoading(false);}};
 useEffect(()=>{load();},[]);
 const changeRole=async(id:string,role:UserRole)=>{setSaving(id);try{await apiFetch(`/api/admin/users/${encodeURIComponent(id)}/role`,{method:"PATCH",auth:true,body:JSON.stringify({role})});toast.success("User role updated.");await load();}catch(error){toast.error(friendlyError(error));}finally{setSaving(null);}};
 return <RequireRole roles={["admin"]}><Workspace title="Users & roles" subtitle="Review platform accounts and assign the right level of access.">
  <div className="dashboard-page-actions"><p>{users.length} registered accounts</p><span className="status-badge status-info"><ShieldCheck size={12}/> Role changes are server-validated</span></div>
  {loading?<div className="loading-block"><span className="loader-ring"/>Loading accounts…</div>:users.length?<div className="dashboard-panel"><div className="table-scroll"><table className="data-table"><thead><tr><th>Member</th><th>Area</th><th>Joined</th><th>Current role</th><th>Change role</th></tr></thead><tbody>{users.map((item)=><tr key={item.id}><td><div className="table-person"><Avatar src={item.image} name={item.name} size="sm"/><span><strong>{item.name}</strong><small>{item.email}</small></span></div></td><td>{item.area||"—"}</td><td>{formatDate(item.createdAt)}</td><td><StatusBadge status={item.role}/></td><td>{item.id===admin?.id?<span className="muted-inline">Current administrator</span>:<select aria-label={`Role for ${item.name}`} className="role-select" value={item.role} disabled={saving===item.id} onChange={(event)=>changeRole(item.id,event.target.value as UserRole)}><option value="customer">Customer</option><option value="technician">Technician</option><option value="admin">Admin</option></select>}</td></tr>)}</tbody></table></div></div>:<EmptyState title="No user accounts found" description="New FixMate registrations will show up here." icon={UserRound}/>}
 </Workspace></RequireRole>;
}
