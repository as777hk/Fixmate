import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "./brand";

const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-main">
        <div className="footer-brand-col">
          <Brand inverse />
          <p>Good repairs start with clear expectations. Find trusted help, follow every step, and pay only when the work is done.</p>
          <div className="social-links" aria-label="Developer social profiles">
            <a href="https://github.com/Annika-Islam" target="_blank" rel="noopener noreferrer" aria-label="Annika Akter on GitHub" title="Annika Akter · GitHub"><Github size={17} /></a>
            <a href="https://www.linkedin.com/in/as-full-stack-dev" target="_blank" rel="noopener noreferrer" aria-label="Annika Akter on LinkedIn" title="Annika Akter · LinkedIn"><Linkedin size={17} /></a>
            <a href="mailto:annikaakter06@gmail.com" aria-label="Email Annika Akter" title="Email Annika Akter"><Mail size={17} /></a>
          </div>
          <small className="footer-credit">Website development · Annika Akter</small>
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
