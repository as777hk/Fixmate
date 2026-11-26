"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Moon, Phone, Sun, X } from "lucide-react";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const nav = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#process", label: "How It Works" },
    { href: "/#contact", label: "Contact" }
  ];

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("fixmate-theme", next);
    setTheme(next);
  };

  const signOut = async () => {
    await authClient.signOut();
    toast.success("You have signed out.");
    setProfileOpen(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : item.href === "/#services" && pathname.startsWith("/services");
            return (
              <Link key={item.href} href={item.href} className={active ? "nav-link active" : "nav-link"}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <a className="header-call" href="tel:+8801711489210" aria-label="Call FixMate support">
            <span className="header-call-icon"><Phone size={16} /></span>
            <span><small>CALL OUR TEAM</small><strong>+880 1711-489210</strong></span>
          </a>
          <button className="icon-button theme-button" aria-label="Toggle colour theme" onClick={toggleTheme}>
            {theme === "dark" || (typeof document !== "undefined" && document.documentElement.dataset.theme === "dark") ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {isPending ? <span className="auth-skeleton" /> : user ? (
            <div className="profile-menu-wrap">
              <button className="profile-trigger" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}>
                <Avatar src={user.image} name={user.name} size="sm" />
                <span className="profile-trigger-name">{user.name.split(" ")[0]}</span><ChevronDown size={15} />
              </button>
              {profileOpen && <>
                <button className="menu-scrim" aria-label="Close account menu" onClick={() => setProfileOpen(false)} />
                <div className="profile-popover">
                  <div className="profile-popover-user"><Avatar src={user.image} name={user.name} /><div><strong>{user.name}</strong><small>{user.email}</small></div></div>
                  <span className={`role-pill role-${user.role}`}>{roleLabel(user.role)}</span>
                  <Link href={dashboardPath(user.role)} onClick={() => setProfileOpen(false)}>Role dashboard <ArrowUpRight size={15} /></Link>
                  <Link href="/dashboard/profile" onClick={() => setProfileOpen(false)}>Update profile <ArrowUpRight size={15} /></Link>
                  <button className="popover-signout" onClick={signOut}>Sign out</button>
                </div>
              </>}
            </div>
          ) : (
            <div className="guest-actions">
              <Link className="button button-quiet button-small" href="/sign-in">Sign in</Link>
              <Link className="button button-primary button-small" href="/sign-up">Sign up <ArrowUpRight size={15} /></Link>
            </div>
          )}
          <button className="mobile-menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menuOpen && <div className="mobile-nav shell">
        {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        {!user && <><Link href="/sign-in" onClick={() => setMenuOpen(false)}>Sign in</Link><Link href="/sign-up" onClick={() => setMenuOpen(false)}>Sign up</Link></>}
        {user && <><Link href={dashboardPath(user.role)} onClick={() => setMenuOpen(false)}>Role dashboard</Link><Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>Update profile</Link><button onClick={signOut}>Sign out</button></>}
      </div>}
    </header>
  );
}
