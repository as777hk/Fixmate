"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Home, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Brand } from "./brand";
import { Avatar } from "./avatar";
import { DashboardNav } from "./dashboard-nav";
import { authClient, useAuth } from "@/lib/auth-client";
import { roleLabel } from "@/lib/auth";

export function Workspace({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  if (!user) return null;
  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("fixmate-theme", next);
  };
  const signOut = async () => { await authClient.signOut(); toast.success("Signed out successfully."); router.push("/"); };
  return <div className={`workspace ${collapsed ? "workspace-collapsed" : ""} ${mobileOpen ? "workspace-mobile-open" : ""}`}>
    <aside className="workspace-sidebar"><div className="workspace-brand"><Brand compact={collapsed}/><button className="sidebar-collapse" onClick={() => setCollapsed((value) => !value)} aria-label="Collapse sidebar">{collapsed ? <ChevronRight size={17}/> : <ChevronLeft size={17}/>}</button></div>
      <div className="workspace-profile"><Avatar src={user.image} name={user.name}/><div><strong>{user.name}</strong><small>{roleLabel(user.role)}</small></div></div>
      <DashboardNav role={user.role}/>
      <div className="sidebar-bottom"><div className="sidebar-tip"><span className="tip-kicker">FIXMATE NOTE</span><strong>Clear updates build trust.</strong><p>Keep every repair moving with the next right step.</p></div><button className="sidebar-signout" onClick={signOut}><LogOut size={17}/><span>Sign out</span></button></div>
    </aside>
    {mobileOpen && <button className="workspace-mobile-scrim" aria-label="Close dashboard menu" onClick={() => setMobileOpen(false)}/>}
    <main className="workspace-main"><header className="workspace-topbar"><div className="topbar-left"><button className="workspace-mobile-trigger" aria-label="Open dashboard menu" onClick={() => setMobileOpen((value) => !value)}><Menu size={20}/></button><Link href="/" className="back-home"><ArrowLeft size={15}/> Back to site</Link><span className="topbar-separator">/</span><span className="topbar-current">{title || "Workspace"}</span></div><div className="topbar-right"><button className="icon-button" aria-label="Toggle colour theme" onClick={toggleTheme}>{typeof window !== "undefined" && document.documentElement.dataset.theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button><Link className="topbar-home" href="/"><Home size={16}/></Link><span className="topbar-user-name">{user.name}</span><Avatar src={user.image} name={user.name} size="sm"/></div></header>
      <div className="workspace-content">{title && <div className="workspace-page-heading"><div><span className="eyebrow">{roleLabel(user.role).toUpperCase()} WORKSPACE</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="workspace-heading-status"><span className="online-dot"/> Account active</div></div>}{children}</div>
    </main>
  </div>;
}
