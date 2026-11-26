"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AirVent, ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2,
  CreditCard, Hammer, Home, Laptop, Phone, Refrigerator, Search,
  ShieldCheck, Smartphone, Tv, WashingMachine, Wrench, Zap
} from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/types";

const tickerItems = [
  { label: "Appliance Repair", icon: Home },
  { label: "Electronics", icon: Smartphone },
  { label: "Air Conditioning", icon: AirVent },
  { label: "Electrical Work", icon: Zap },
  { label: "Home Repairs", icon: Hammer }
];

const process = [
  {
    number: "01",
    title: "Tell us what needs fixing",
    copy: "Choose a repair service, share the issue and send your preferred booking details.",
    icon: Search
  },
  {
    number: "02",
    title: "Get reliable help",
    copy: "A technician reviews the request, confirms the job and keeps the repair status updated.",
    icon: Wrench
  },
  {
    number: "03",
    title: "Approve and pay",
    copy: "Check the completed work and settle the payment after the repair is finished.",
    icon: CreditCard
  }
];

const showcaseItems = [
  {
    title: "Electrical safety",
    detail: "Home electrical checks",
    image: "/images/srv-107-electrical-db.webp",
    alt: "Technician inspecting a home electrical distribution board"
  },
  {
    title: "Cooling service",
    detail: "Air conditioning maintenance",
    image: "/images/srv-102-ac-wash.webp",
    alt: "Air conditioning unit being cleaned and serviced"
  },
  {
    title: "Appliance repair",
    detail: "Refrigerator diagnostics",
    image: "/images/srv-104-fridge-compressor.webp",
    alt: "Technician working on a refrigerator compressor"
  }
];

const repairPaths = [
  {
    label: "DEVICE CARE",
    title: "Phones & Computers",
    copy: "Get help with everyday devices, screens and performance issues.",
    items: ["Smartphone repair", "Laptop & PC service", "TV diagnostics"]
  },
  {
    label: "HOME APPLIANCES",
    title: "Appliance Repairs",
    copy: "Find support for the appliances your home depends on.",
    items: ["Refrigerator repair", "Washing machine service", "Appliance maintenance"],
    featured: true
  },
  {
    label: "HOME SYSTEMS",
    title: "AC & Electrical",
    copy: "Explore cooling, electrical and home system repair services.",
    items: ["AC servicing", "Electrical work", "Home safety checks"]
  }
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
            <span className="hm-eyebrow"><span className="hm-eyebrow-dot" /> REPAIR HELP, WITHOUT THE HASSLE</span>
            <h1>Your trusted <span>repair expert</span> is just one click away.</h1>
            <p>From everyday appliance repairs to device and electrical fixes, find the right professional and keep every step clear.</p>
            <div className="hm-hero-actions">
              <Link className="hm-btn hm-btn-orange" href="/services">Get Started <ArrowUpRight size={17} /></Link>
              <Link className="hm-btn hm-btn-navy" href="/services">Our Services <ArrowRight size={16} /></Link>
            </div>
            <form className="hm-search" onSubmit={submitSearch}>
              <Search size={18} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What needs fixing today?" aria-label="Search repair services" />
              <button type="submit" aria-label="Search services"><ArrowRight size={18} /></button>
            </form>
            <div className="hm-hero-proof">
              <span><ShieldCheck size={16} /> Reviewed service listings</span>
              <span><CheckCircle2 size={16} /> Clear repair updates</span>
              <span><CheckCircle2 size={16} /> Pay after completion</span>
            </div>
          </div>
          <div className="hm-hero-visual">
            <div className="hm-hero-image-frame">
              <img
                src="/images/hero-workshop.webp"
                alt="Repair technician working on an electronic circuit at a workshop"
                className="hm-hero-image"
                fetchPriority="high"
              />
            </div>
            <div className="hm-photo-tag">
              <span><BadgeCheck size={19} /></span>
              <div><small>THE FIXMATE PROMISE</small><strong>Skilled help. Clear progress.</strong></div>
            </div>
            <div className="hm-floating-note">
              <span className="hm-note-icon"><CreditCard size={17} /></span>
              <div><small>PAYMENT POLICY</small><strong>Only after the repair</strong></div>
            </div>
            <div className="hm-guarantee-stamp"><ShieldCheck size={20} /><strong>PAY AFTER</strong><span>COMPLETION</span></div>
            <span className="hm-image-corner" />
          </div>
        </div>
      </section>

      <section className="hm-category-ribbon" aria-label="Repair categories">
        <div className="shell hm-category-track">
          <span className="hm-ribbon-lead">WE CAN HELP WITH</span>
          {tickerItems.map(({ label, icon: Icon }) => (
            <Link href="/services" className="hm-ribbon-item" key={label}>
              <Icon size={24} /><strong>{label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="hm-section hm-services-section" id="services">
        <div className="shell">
          <div className="hm-section-heading">
            <div>
              <span className="hm-eyebrow">POPULAR REPAIR SERVICES</span>
              <h2>Professional repair help, right when you need it.</h2>
              <p>Explore available services, compare the details and choose the right support for the job.</p>
            </div>
            <Link href="/services" className="hm-outline-link">See all services <ArrowUpRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="hm-service-grid">{Array.from({ length: 3 }).map((_, index) => <div className="hm-service-skeleton" key={index} />)}</div>
          ) : services.length ? (
            <div className="hm-service-grid">{services.slice(0, 3).map((service) => <ServiceCard key={service._id} service={service} />)}</div>
          ) : (
            <div className="hm-empty-services">
              <Wrench size={24} />
              <h3>New repair services are on the way</h3>
              <p>Browse the directory to see available and newly approved listings.</p>
              <Link href="/services" className="hm-btn hm-btn-orange">Browse services <ArrowRight size={16} /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="hm-about-section" id="about">
        <div className="shell hm-about-grid">
          <div className="hm-about-visual">
            <img
              src="/images/srv-107-electrical-db.webp"
              alt="Technician inspecting a home electrical distribution board"
              className="hm-about-image"
              loading="lazy"
            />
            <div className="hm-experience-card">
              <span className="hm-experience-icon"><ShieldCheck size={24} /></span>
              <strong>Built around trust</strong>
              <small>Clear service details at every step</small>
            </div>
          </div>
          <div className="hm-about-copy">
            <span className="hm-eyebrow">WHO WE ARE</span>
            <h2>Built on <span>skill,</span><br />driven by <span>trust.</span></h2>
            <p>FixMate brings repair services into one clear place. Customers can discover available professionals, submit requests, follow job progress and pay after the work is complete.</p>
            <div className="hm-benefits">
              <span><CheckCircle2 size={17} /> Reviewed service listings</span>
              <span><CheckCircle2 size={17} /> Clear repair updates</span>
              <span><CheckCircle2 size={17} /> Transparent service details</span>
              <span><CheckCircle2 size={17} /> Pay after completion</span>
            </div>
            <div className="hm-about-actions">
              <Link href="/about" className="hm-btn hm-btn-navy">Read More <ArrowUpRight size={16} /></Link>
              <a href="tel:+8801711489210" className="hm-phone-link"><Phone size={17} /> +880 1711-489210</a>
            </div>
          </div>
        </div>
      </section>

      <section className="hm-stats-section" aria-label="FixMate platform highlights">
        <div className="shell hm-stats-grid">
          <article><strong>07</strong><span>Repair categories</span></article>
          <article><strong>05</strong><span>Visible repair milestones</span></article>
          <article><strong>03</strong><span>Simple booking steps</span></article>
          <article><strong>01</strong><span>Place to manage your repair</span></article>
        </div>
      </section>

      <section className="hm-section hm-process-section" id="process">
        <div className="shell">
          <div className="hm-section-heading hm-section-heading-centered">
            <div>
              <span className="hm-eyebrow">HOW IT WORKS</span>
              <h2>Our simple <span>3-step</span> process.</h2>
              <p>From your first request to the final payment, you know what happens next.</p>
            </div>
          </div>
          <div className="hm-process-grid hm-process-grid-three">
            {process.map(({ number, title, copy, icon: Icon }) => (
              <article className="hm-process-card" key={number}>
                <div className="hm-process-top"><span>{number}</span><Icon size={23} /></div>
                <small>STEP {number}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-showcase-section">
        <div className="shell">
          <div className="hm-section-heading">
            <div>
              <span className="hm-eyebrow">REPAIR WORK, UP CLOSE</span>
              <h2>Proud to showcase the work we support.</h2>
              <p>A closer look at the repair categories and specialist services available through FixMate.</p>
            </div>
            <Link href="/services" className="hm-outline-link">Explore services <ArrowUpRight size={16} /></Link>
          </div>
          <div className="hm-showcase-grid">
            {showcaseItems.map((item, index) => (
              <Link href="/services" className={`hm-showcase-card hm-showcase-card-${index + 1}`} key={item.title}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="hm-showcase-overlay" />
                <span className="hm-showcase-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                <span className="hm-showcase-arrow"><ArrowUpRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-path-section">
        <div className="shell">
          <div className="hm-section-heading hm-section-heading-centered">
            <div>
              <span className="hm-eyebrow">FIND THE RIGHT SUPPORT</span>
              <h2>Choose the right repair service for you.</h2>
              <p>Service details and pricing are shown with each available listing before you send a request.</p>
            </div>
          </div>
          <div className="hm-path-grid">
            {repairPaths.map((path) => (
              <article className={`hm-path-card ${path.featured ? "hm-path-card-featured" : ""}`} key={path.title}>
                <span className="hm-path-label">{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <ul>{path.items.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul>
                <Link href="/services" className="hm-path-link">View available services <ArrowRight size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-cta-section">
        <div className="shell hm-cta-panel">
          <div>
            <span className="hm-eyebrow">READY WHEN YOU NEED US</span>
            <h2>Let’s get that repair moving.</h2>
            <p>Find a service, send your request and keep every step in view.</p>
          </div>
          <div className="hm-cta-actions">
            <Link href="/services" className="hm-btn hm-btn-orange">Get Started <ArrowUpRight size={16} /></Link>
            <Link href="/sign-up" className="hm-cta-secondary">Create an account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
