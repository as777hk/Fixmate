"use client";

import { useEffect, useState } from "react";
import { Camera, Save, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { RequireRole } from "@/components/require-role";
import { Workspace } from "@/components/workspace";
import { Avatar } from "@/components/avatar";
import { apiFetch, friendlyError, uploadImage } from "@/lib/api";
import { authClient, useAuth } from "@/lib/auth-client";

export default function ProfilePage(){
 const {user,refetch}=useAuth();const [name,setName]=useState("");const [phone,setPhone]=useState("");const [area,setArea]=useState("");const [bio,setBio]=useState("");const [image,setImage]=useState("");const [file,setFile]=useState<File|null>(null);const [preview,setPreview]=useState("");const [busy,setBusy]=useState(false);
 useEffect(()=>{if(user){setName(user.name||"");setPhone(user.phone||"");setArea(user.area||"");setBio(user.bio||"");setImage(user.image||"");}},[user]);
 const choose=(next:File|null)=>{if(preview)URL.revokeObjectURL(preview);setFile(next);setPreview(next?URL.createObjectURL(next):"");};
 const save=async(event:React.FormEvent)=>{event.preventDefault();if(!user)return;setBusy(true);try{const uploaded=file?await uploadImage(file):image;await apiFetch("/api/users/profile",{method:"PATCH",auth:true,body:JSON.stringify({name:name.trim(),phone:phone.trim(),area:area.trim(),bio:bio.trim(),image:uploaded})});const authUpdate=await authClient.updateUser({name:name.trim(),image:uploaded});if(authUpdate.error)throw new Error(authUpdate.error.message||"Profile saved, but the session could not refresh.");setImage(uploaded);setFile(null);setPreview("");await refetch();toast.success("Your profile has been updated.");}catch(error){toast.error(friendlyError(error));}finally{setBusy(false);}};
 return <RequireRole><Workspace title="Profile settings" subtitle="Keep your contact details current. Your new name and photo will appear across FixMate.">
  <div className="dashboard-grid equal"><section className="dashboard-panel"><div className="panel-heading"><h3>Your information</h3><span className="status-badge status-success"><ShieldCheck size={12}/> Secure profile</span></div>
   <form className="form-stack" onSubmit={save}>
    <div className="profile-photo-editor"><Avatar src={preview||image} name={name||user?.name||"Member"} size="lg"/><div><label className="button button-quiet button-small" htmlFor="profile-photo"><Camera size={14}/> Change photo</label><input id="profile-photo" className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event)=>choose(event.target.files?.[0]||null)}/><small>JPG, PNG or WEBP · max 5 MB</small></div></div>
    <div className="field"><label htmlFor="profile-name">Full name</label><input id="profile-name" value={name} onChange={(event)=>setName(event.target.value)} required minLength={2}/></div>
    <div className="form-grid"><div className="field"><label>Email address</label><input value={user?.email||""} readOnly disabled/></div><div className="field"><label>Account role</label><input value={user?.role||""} readOnly disabled/></div></div>
    <div className="form-grid"><div className="field"><label htmlFor="profile-phone">Phone number</label><input id="profile-phone" value={phone} onChange={(event)=>setPhone(event.target.value)} placeholder="+880 1XXXXXXXXX"/></div><div className="field"><label htmlFor="profile-area">City / service area</label><input id="profile-area" value={area} onChange={(event)=>setArea(event.target.value)} placeholder="Dhanmondi, Dhaka"/></div></div>
    <div className="field"><label htmlFor="profile-bio">Short introduction</label><textarea id="profile-bio" rows={4} maxLength={400} value={bio} onChange={(event)=>setBio(event.target.value)} placeholder="A little about your work, experience or repair needs…"/><small>{bio.length}/400 characters</small></div>
    <button className="button button-primary" disabled={busy}><Save size={15}/>{busy?"Saving profile…":"Save profile changes"}</button>
   </form>
  </section><aside className="dashboard-panel"><span className="eyebrow">ACCOUNT IDENTITY</span><div style={{display:"flex",alignItems:"center",gap:14,marginTop:16}}><Avatar src={preview||image} name={name||user?.name||"Member"} size="lg"/><div><h3 style={{fontSize:17,margin:0}}>{name||"Your name"}</h3><p style={{fontSize:11,color:"var(--muted)",marginTop:5}}>{user?.email}</p></div></div><div className="request-note" style={{marginTop:20}}><UserRound size={16}/> Your role and email are read-only here. For account-security reasons, role changes are handled by a platform administrator.</div><ul className="plain-check-list"><li>Use a phone number where technicians can reach you.</li><li>Keep the service area accurate for home visits.</li><li>Technicians can describe their specialties in the bio field.</li></ul></aside></div>
 </Workspace></RequireRole>;
}
