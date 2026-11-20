import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "./brand";

const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];
export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-main">
      <div className="footer-brand-col"><Brand inverse /><p>Good repairs start with clear expectations. Find trusted help, follow every step, and pay only when the work is done.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><span className="x-social">𝕏</span></a></div></div>
      <div><h3>Explore</h3><Link href="/">Home</Link><Link href="/services">Browse services</Link><Link href="/about">How it works</Link><Link href="/sign-up">Join as a technician</Link></div>
      <div><h3>Popular categories</h3>{categories.map((category) => <Link key={category} href={`/services?category=${encodeURIComponent(category)}`}>{category}</Link>)}</div>
      <div className="footer-contact"><h3>Talk to FixMate</h3><a href="mailto:hello@fixmate.app"><Mail size={15} /> hello@fixmate.app</a><a href="tel:+8801700000000"><Phone size={15} /> +880 1700-000000</a><span><MapPin size={15} /> Dhaka, Bangladesh</span><Link className="footer-cta" href="/services">Find your repair <ArrowUpRight size={15} /></Link></div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} FixMate. Made for repairs that feel straightforward.</span><span>Transparent work. Confident handovers.</span></div>
  </footer>;
}
