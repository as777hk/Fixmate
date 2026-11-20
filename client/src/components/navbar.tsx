"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { toast } from "sonner";
import { Brand } from "./brand";
import { Avatar } from "./avatar";
import { authClient, useAuth } from "@/lib/auth-client";
import { dashboardPath, roleLabel } from "@/lib/auth";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isPending } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const nav = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }];
  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("fixmate-theme", next);
  };
  const signOut = async () => {
    await authClient.signOut();
    toast.success("You have signed out.");
    setProfileOpen(false);
    router.push("/");
    router.refresh();
  };
  return <header className="site-header">
    <div className="header-inner shell">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "nav-link active" : "nav-link"}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button theme-button" aria-label="Toggle colour theme" onClick={toggleTheme}>{typeof window !== "undefined" && document.documentElement.dataset.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
        {isPending ? <span className="auth-skeleton" /> : user ? <div className="profile-menu-wrap">
          <button className="profile-trigger" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
            <Avatar src={user.image} name={user.name} size="sm" />
            <span className="profile-trigger-name">{user.name.split(" ")[0]}</span><ChevronDown size={15} />
          </button>
          {profileOpen && <>
            <button className="menu-scrim" aria-label="Close account menu" onClick={() => setProfileOpen(false)} />
            <div className="profile-popover">
              <div className="profile-popover-user"><Avatar src={user.image} name={user.name} /><div><strong>{user.name}</strong><small>{user.email}</small></div></div>
              <span className={`role-pill role-${user.role}`}>{roleLabel(user.role)}</span>
              <Link href={dashboardPath(user.role)} onClick={() => setProfileOpen(false)}>Dashboard <ArrowUpRight size={15} /></Link>
              <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}>Update profile <ArrowUpRight size={15} /></Link>
              <button className="popover-signout" onClick={signOut}>Sign out</button>
            </div>
          </>}
        </div> : <div className="guest-actions"><Link className="button button-quiet button-small" href="/sign-in">Sign in</Link><Link className="button button-primary button-small" href="/sign-up">Get started <ArrowUpRight size={15} /></Link></div>}
        <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </div>
    {menuOpen && <div className="mobile-nav shell">
      {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
      {!user && <><Link href="/sign-in" onClick={() => setMenuOpen(false)}>Sign in</Link><Link href="/sign-up" onClick={() => setMenuOpen(false)}>Create account</Link></>}
      {user && <><Link href={dashboardPath(user.role)} onClick={() => setMenuOpen(false)}>Dashboard</Link><Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>Update profile</Link><button onClick={signOut}>Sign out</button></>}
    </div>}
  </header>;
}
