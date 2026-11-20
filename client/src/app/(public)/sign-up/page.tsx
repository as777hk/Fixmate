"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient, useAuth } from "@/lib/auth-client";
import { dashboardPath } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();
  useEffect(() => { if (!isPending && user) router.replace(dashboardPath(user.role)); }, [isPending, user, router]);
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [role,setRole]=useState<"customer"|"technician">("customer"); const [busy,setBusy]=useState(false); const [googleBusy,setGoogleBusy]=useState(false); const googleEnabled=process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED==="true";
  const passwordValid = password.length>=6 && /[A-Z]/.test(password) && /[a-z]/.test(password);
  const submit = async (event:React.FormEvent)=>{
    event.preventDefault();
    if(name.trim().length<2){toast.error("Enter your full name.");return;}
    if(!passwordValid){toast.error("Password needs 6+ characters, one uppercase and one lowercase letter.");return;}
    setBusy(true);
    try{
      const result=await authClient.signUp.email({name:name.trim(),email:email.trim().toLowerCase(),password,role} as never);
      if(result.error) throw new Error(result.error.message);
      toast.success("Your FixMate account is ready.");
      router.push(dashboardPath((result.data?.user as {role?:string})?.role || role));
      router.refresh();
    }catch(error){toast.error(error instanceof Error?error.message:"Could not create your account.");}
    finally{setBusy(false);}
  };
  const signUpWithGoogle=async()=>{
    setGoogleBusy(true);
    try{
      const result=await authClient.signIn.social({provider:"google",callbackURL:new URL("/sign-up",window.location.origin).toString()});
      if(result.error)throw new Error(result.error.message);
    }catch(error){toast.error(error instanceof Error?error.message:"Google sign-up could not be started.");setGoogleBusy(false);}
  };
  if (isPending || user) return <div className="auth-route-loader"><span className="loader-ring"/><p>Checking your account…</p></div>;
  return <section className="form-page"><div className="form-card"><div className="form-heading"><span className="eyebrow">JOIN FIXMATE / 01</span><h1>Create your account.</h1><p>Choose how you want to use FixMate. You can update your profile details later.</p></div><form className="form-stack" onSubmit={submit}><div className="field"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)} required minLength={2} placeholder="Your full name"/></div><div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com"/></div><div className="field"><label htmlFor="password">Password</label><input id="password" type="password" autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="Create a secure password"/><small className={password && !passwordValid ? "field-error" : ""}>At least 6 characters, including one uppercase and one lowercase letter.</small></div><div className="field"><span className="field-label">I’m joining as</span><div className="role-selector"><button type="button" className={`role-option ${role==="customer"?"selected":""}`} onClick={()=>setRole("customer")}><UserRound size={19}/><span><strong>Customer</strong><small>Find and book repairs</small></span></button><button type="button" className={`role-option ${role==="technician"?"selected":""}`} onClick={()=>setRole("technician")}><BriefcaseBusiness size={19}/><span><strong>Technician</strong><small>Offer repair services</small></span></button></div></div><button className="button button-primary form-submit" disabled={busy}>{busy?"Creating account…":"Create account"}<ArrowRight size={15}/></button></form>{googleEnabled&&<><div className="form-divider" style={{margin:"20px 0 14px"}}>OR SIGN UP WITH</div><button type="button" className="button google-auth-button" onClick={signUpWithGoogle} disabled={googleBusy}><span className="google-mark" aria-hidden="true">G</span>{googleBusy?"Connecting to Google…":"Continue with Google"}</button><p className="form-footnote">Google sign-up creates a customer account. Choose email sign-up to register as a technician.</p></>}<p className="form-footnote">Already have an account? <Link href="/sign-in">Sign in</Link></p></div></section>;
}
