import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "./brand";

const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand-col">
          <Brand inverse />
          <p>Good repairs start with clear expectations. Find trusted help, follow every step, and pay only when the work is done.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
              <svg className="x-social" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 23.2h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.78h2.04L6.39 3.3H4.2l13.41 17.63Z" />
              </svg>
            </a>
          </div>
        </div>
        <div><h3>Explore</h3><Link href="/">Home</Link><Link href="/services">Browse services</Link><Link href="/about">How it works</Link><Link href="/sign-up">Join as a technician</Link></div>
        <div><h3>Popular categories</h3>{categories.map((category) => <Link key={category} href={`/services?category=${encodeURIComponent(category)}`}>{category}</Link>)}</div>
        <div className="footer-contact">
          <h3>Talk to FixMate</h3>
          <a href="mailto:support@fixmate.com.bd"><Mail size={15} /> support@fixmate.com.bd</a>
          <a href="tel:+8801711489210"><Phone size={15} /> +880 1711-489210</a>
          <span><MapPin size={15} /> Level 4, House 18, Road 27, Dhanmondi, Dhaka 1209</span>
          <Link className="footer-cta" href="/services">Find your repair <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} FixMate. Made for repairs that feel straightforward.</span><span>Transparent work. Confident handovers.</span></div>
    </footer>
  );
}
