"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AirVent, ArrowRight, ArrowUpRight, BadgeCheck, CalendarCheck,
  CheckCircle2, CreditCard, Hammer, Home, Laptop, Refrigerator,
  Search, ShieldCheck, Smartphone, Tv, WashingMachine, Wrench, Zap
} from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { TicketReplay } from "@/components/ticket-replay";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/types";

const categories = [
  { name: "Smartphone", icon: Smartphone, text: "Screen & battery repair" },
  { name: "Laptop & PC", icon: Laptop, text: "Hardware & performance" },
  { name: "AC", icon: AirVent, text: "Cooling & servicing" },
  { name: "Refrigerator", icon: Refrigerator, text: "Cooling & maintenance" },
  { name: "TV", icon: Tv, text: "Display & setup" },
  { name: "Washing Machine", icon: WashingMachine, text: "Drain & installation" },
  { name: "Electrical", icon: Zap, text: "Safe home wiring" }
];

const process = [
  { number: "01", label: "Explore approved listings", title: "Find a service", copy: "Browse repair categories and compare approved services, prices and technicians.", icon: Search },
  { number: "02", label: "Share the repair details", title: "Send a request", copy: "Choose a preferred date, add your contact details and explain what needs fixing.", icon: CalendarCheck },
  { number: "03", label: "Follow the job status", title: "Technician fixes it", copy: "Your technician accepts the request, starts the work and updates the repair progress.", icon: Wrench },
  { number: "04", label: "Settle up when it is done", title: "Pay after completion", copy: "Review the final amount after the repair is complete, then pay securely.", icon: CreditCard }
];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch<{ data: Service[] }>("/api/services?limit=6&sort=newest")
      .then((result) => { if (active) setServices(result.data || []); })
      .catch(() => { if (active) setServices([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = search.trim();
    window.location.href = query ? `/services?search=${encodeURIComponent(query)}` : "/services";
  };

  return (
    <>
      <section className="hm-hero">
        <div className="shell hm-hero-inner">
          <div className="hm-hero-copy">
            <span className="hm-eyebrow"><span className="hm-eyebrow-dot" /> THE SMARTER WAY TO REPAIR</span>
            <h1>Your trusted <span>repair expert</span> is just one click away.</h1>
            <p>From small fixes to major appliance repairs, find the right professional, follow every update and pay only when the job is complete.</p>
            <div className="hm-hero-actions">
              <Link className="hm-btn hm-btn-orange" href="/sign-up">Get Started <ArrowUpRight size={17} /></Link>
              <Link className="hm-btn hm-btn-navy" href="/services">Our Services <ArrowRight size={16} /></Link>
            </div>
            <form className="hm-search" onSubmit={submitSearch}>
              <Search size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What needs fixing today?" aria-label="Search repair services" />
              <button type="submit" aria-label="Search services"><ArrowRight size={18} /></button>
            </form>
            <div className="hm-hero-proof">
              <span><ShieldCheck size={16} /> Reviewed service listings</span>
              <span><CheckCircle2 size={16} /> Pay after completion</span>
              <span><CheckCircle2 size={16} /> Seven repair categories</span>
            </div>
            <TicketReplay />
          </div>
          <div className="hm-hero-visual">
            <div className="hm-hero-image-frame">
              <img
                src="/images/hero-workshop.webp"
                alt="Professional plumber repairing a pipe with a wrench"
                className="hm-hero-image"
              />
            </div>
            <div className="hm-photo-tag"><span><BadgeCheck size={19} /></span><div><small>THE FIXMATE PROMISE</small><strong>Skilled help. Clear progress.</strong></div></div>
            <div className="hm-floating-note"><span className="hm-note-icon"><CreditCard size={17} /></span><div><small>PAYMENT POLICY</small><strong>Only after the repair</strong></div></div>
            <span className="hm-image-corner" />
          </div>
        </div>
      </section>

      <section className="hm-category-ribbon" aria-label="Repair categories">
        <div className="shell hm-category-track">
          <span className="hm-ribbon-lead">WE HELP FIX</span>
          {[
            { label: "Home appliances", icon: Home },
            { label: "Electronics", icon: Smartphone },
            { label: "Air conditioning", icon: AirVent },
            { label: "Electrical work", icon: Zap },
            { label: "Home repairs", icon: Hammer }
          ].map(({ label, icon: Icon }) => (
            <Link href="/services" className="hm-ribbon-item" key={label}><Icon size={25} /><strong>{label}</strong></Link>
          ))}
        </div>
      </section>

      <section className="hm-section hm-services-section" id="services">
        <div className="shell">
          <div className="hm-section-heading">
            <div>
              <span className="hm-eyebrow">POPULAR REPAIR SERVICES</span>
              <h2>Professional help for the things you rely on.</h2>
              <p>Browse available services, compare the details and choose the repair that fits your needs.</p>
            </div>
            <Link href="/services" className="hm-outline-link">See all services <ArrowUpRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="hm-service-grid">{Array.from({ length: 6 }).map((_, index) => <div className="hm-service-skeleton" key={index} />)}</div>
          ) : services.length ? (
            <div className="hm-service-grid">{services.slice(0, 6).map((service) => <ServiceCard key={service._id} service={service} />)}</div>
          ) : (
            <div className="hm-empty-services"><Wrench size={24} /><h3>New repair services are on the way</h3><p>Browse the directory again soon to see newly approved listings.</p><Link href="/services" className="hm-btn hm-btn-orange">Browse services <ArrowRight size={16} /></Link></div>
          )}
        </div>
      </section>

      <section className="hm-about-section">
        <div className="shell hm-about-grid">
          <div className="hm-about-visual">
            <img
              src="/images/srv-107-electrical-db.webp"
              alt="Repair professional working on a home improvement project"
              className="hm-about-image"
            />
            <div className="hm-experience-card"><span className="hm-experience-icon"><ShieldCheck size={24} /></span><strong>Built around trust</strong><small>Clear service details at every step</small></div>
          </div>
          <div className="hm-about-copy">
            <span className="hm-eyebrow">WHO WE ARE</span>
            <h2>Built on <span>skill,</span><br />driven by <span>trust.</span></h2>
            <p>FixMate makes repair services easier to discover and easier to follow. Customers know what stage their request is in, technicians manage the jobs assigned to them, and payment comes after the work is complete.</p>
            <div className="hm-benefits">
              <span><CheckCircle2 size={17} /> Reviewed service listings</span>
              <span><CheckCircle2 size={17} /> Clear repair status</span>
              <span><CheckCircle2 size={17} /> Transparent service details</span>
              <span><CheckCircle2 size={17} /> Pay after completion</span>
            </div>
            <div className="hm-about-actions"><Link href="/about" className="hm-btn hm-btn-navy">How FixMate works <ArrowUpRight size={16} /></Link><Link href="/services" className="hm-phone-link"><Wrench size={17} /> Find a service</Link></div>
          </div>
        </div>
      </section>

      <section className="hm-section hm-process-section">
        <div className="shell">
          <div className="hm-section-heading hm-section-heading-centered">
            <div>
              <span className="hm-eyebrow">HOW IT WORKS</span>
              <h2>Our simple <span>4-step</span> process.</h2>
              <p>From your first request to the final payment, the next step is always clear.</p>
            </div>
          </div>
          <div className="hm-process-grid">
            {process.map(({ number, label, title, copy, icon: Icon }) => (
              <article className="hm-process-card" key={number}>
                <div className="hm-process-top"><span>{number}</span><Icon size={22} /></div>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-visual-services">
        <div className="shell">
          <div className="hm-section-heading">
            <div><span className="hm-eyebrow">REPAIR, MADE SIMPLE</span><h2>One place for the fixes that matter.</h2><p>Explore the categories supported by FixMate and find a service that matches the job.</p></div>
            <Link href="/services" className="hm-dark-small-link">Explore directory <ArrowUpRight size={15} /></Link>
          </div>
          <div className="hm-category-grid">
            {categories.map(({ name, icon: Icon, text }) => (
              <Link href={`/services?category=${encodeURIComponent(name)}`} className="hm-category-card" key={name}>
                <span className="hm-category-icon"><Icon size={22} /></span><div><strong>{name}</strong><small>{text}</small></div><ArrowUpRight size={16} className="hm-category-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-cta-section">
        <div className="shell hm-cta-panel">
          <div><span className="hm-eyebrow">READY WHEN YOU NEED US</span><h2>Let’s get that repair moving.</h2><p>Find a service, send your request and keep every step in view.</p></div>
          <div className="hm-cta-actions"><Link href="/services" className="hm-btn hm-btn-orange">Find a service <ArrowUpRight size={16} /></Link><Link href="/sign-up" className="hm-cta-secondary">Create an account</Link></div>
        </div>
      </section>
    </>
  );
}
