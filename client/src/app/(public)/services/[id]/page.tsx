"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/avatar";
import { EmptyState } from "@/components/empty-state";
import { apiFetch, formatDate, friendlyError, money } from "@/lib/api";
import { useAuth } from "@/lib/auth-client";
import type { Service } from "@/types";

function ServiceDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isPending } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const localToday = () => { const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); return now.toISOString().slice(0,10); };
  const [date, setDate] = useState(localToday());
  const [problem, setProblem] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (!params.id) return;
    let active = true;
    apiFetch<{ data: Service }>(`/api/services/${params.id}`).then((result)=>{if(active)setService(result.data);}).catch(()=>{if(active)setService(null);}).finally(()=>{if(active)setLoading(false);});
    return ()=>{active=false;};
  }, [params.id]);
  if (loading || isPending) return <div className="loading-block"><span className="loader-ring"/>Loading service details…</div>;
  if (!service) return <section className="shell" style={{paddingTop:55}}><EmptyState title="This service is unavailable" description="It may have been removed or is waiting for review." actionLabel="Browse other services" actionHref="/services"/></section>;
  const canRequest = user?.role === "customer";
  const request = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) { router.push(`/sign-in?callbackUrl=${encodeURIComponent(`/services/${params.id}`)}`); return; }
    if (!canRequest) return;
    if (problem.trim().length < 20) { toast.error("Describe the problem in at least 20 characters."); return; }
    setSubmitting(true);
    try {
      const result = await apiFetch<{message:string;data:unknown}>("/api/bookings", { method: "POST", auth: true, body: JSON.stringify({ serviceId: service._id, customerPhone: phone, address, preferredDate: date, problemDescription: problem }) });
      toast.success(result.message || "Repair request sent.");
      router.push("/dashboard/customer/bookings");
    } catch (error) { toast.error(friendlyError(error)); }
    finally { setSubmitting(false); }
  };
  return <section className="shell detail-section"><Link href="/services" className="back-home"><ArrowLeft size={15}/> Back to services</Link><div className="detail-layout" style={{marginTop:18}}><div><div className="detail-image"><Image src={service.image || "/images/repair-placeholder.svg"} alt={service.title} fill unoptimized sizes="(max-width: 760px) 100vw, 60vw"/></div><div className="detail-copy" style={{marginTop:28}}><span className="eyebrow">{service.category} / REPAIR SERVICE</span><h1>{service.title}</h1><p>{service.description}</p><div className="technician-card"><Avatar src={service.technician?.image} name={service.technicianName} size="lg"/><div><strong>{service.technicianName}</strong><small><ShieldCheck size={12} style={{verticalAlign:"-2px",color:"#2563eb"}}/> Service provider · {service.technician?.area || service.serviceArea}</small>{service.technician?.plan === "pro" && <span className="verified-pro-badge"><ShieldCheck size={12}/> Verified Pro</span>}<small>{service.technician?.bio || "Approved FixMate service provider."}</small></div></div></div></div>
      <aside><div className="request-box"><span className="eyebrow">SERVICE OVERVIEW</span><div className="detail-price">{money(service.basePrice)} <small>starting price</small></div><div className="detail-facts"><div className="detail-fact"><Clock3 size={17}/><span>EST. DURATION<strong>{service.estimatedDuration}</strong></span></div><div className="detail-fact"><Wrench size={17}/><span>SERVICE MODE<strong>{service.serviceMode}</strong></span></div><div className="detail-fact"><MapPin size={17}/><span>SERVICE AREA<strong>{service.serviceArea}</strong></span></div><div className="detail-fact"><CalendarDays size={17}/><span>AVAILABILITY<strong>Accepting requests</strong></span></div></div><p>Final pricing is confirmed by the technician when the repair is complete. Payment is collected only after completion.</p>
        {!user && <Link className="button button-primary form-submit" href={`/sign-in?callbackUrl=${encodeURIComponent(`/services/${params.id}`)}`}>Sign in to request a repair</Link>}
        {user && !canRequest && <div className="request-note">Only customers can request a repair. Your {user.role} account can use its own dashboard instead.</div>}
        {canRequest && <form className="form-stack" onSubmit={request}><h2>Request this repair</h2><p>Your account details are attached automatically.</p><div className="field"><label>Name</label><input value={user.name} readOnly/></div><div className="field"><label>Email</label><input value={user.email} readOnly/></div><div className="field"><label htmlFor="phone">Phone number</label><input id="phone" required value={phone} onChange={(event)=>setPhone(event.target.value)} placeholder="+880 1XXX-XXXXXX"/></div><div className="field"><label htmlFor="address">Service address</label><textarea id="address" required minLength={8} value={address} onChange={(event)=>setAddress(event.target.value)} placeholder="House, road, area and city"/></div><div className="field"><label htmlFor="date">Preferred date</label><input id="date" type="date" min={localToday()} required value={date} onChange={(event)=>setDate(event.target.value)}/></div><div className="field"><label htmlFor="problem">What is happening?</label><textarea id="problem" minLength={20} required value={problem} onChange={(event)=>setProblem(event.target.value)} placeholder="Describe the device or appliance issue in at least 20 characters…"/><small>{problem.trim().length}/20 minimum characters</small></div><button className="button button-primary form-submit" disabled={submitting}>{submitting ? "Sending request…" : "Send repair request"}</button></form>}
      </div></aside></div></section>;
}
export default function ServiceDetailsPage() { return <Suspense fallback={<div className="loading-block"><span className="loader-ring"/>Loading…</div>}><ServiceDetails/></Suspense>; }
