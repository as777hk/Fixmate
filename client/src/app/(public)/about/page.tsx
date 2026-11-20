import Link from "next/link";
import { ArrowUpRight, ClipboardList, CreditCard, Search, ShieldCheck, Wrench } from "lucide-react";

const stages = [
  { label: "Requested", detail: "The customer sends a repair request.", tone: "requested" },
  { label: "Accepted", detail: "The technician accepts it, or rejects it.", tone: "accepted" },
  { label: "In Progress", detail: "The technician starts working on the device.", tone: "progress" },
  { label: "Completed", detail: "The job is done and the final price is set.", tone: "completed" },
  { label: "Paid", detail: "The customer pays after the work is complete.", tone: "paid" }
];

const roles = [
  { title: "Customers", text: "Browse approved services, explain the issue, follow each status update and pay only after the technician completes the repair.", icon: Search },
  { title: "Technicians", text: "Publish service listings, respond to incoming requests, update job progress and set the final repair amount.", icon: Wrench },
  { title: "Administrators", text: "Review service listings, manage account roles and monitor the platform’s bookings and payments.", icon: ShieldCheck }
];

export default function AboutPage() {
  return <>
    <section className="about-hero">
      <div className="shell">
        <span className="eyebrow">HOW FIXMATE WORKS</span>
        <h1>How FixMate works</h1>
        <p>A repair platform built around one idea: you should always know where your job is, and you pay only when it is done.</p>
      </div>
    </section>

    <section className="reference-flow-section">
      <div className="shell reference-flow-grid">
        <div className="reference-flow-copy">
          <h2>Every job follows the same steps</h2>
          <p>A request is accepted or declined by the technician, then moves to in progress and completed. Only after that can it be paid. Steps cannot be skipped, and a request can only be cancelled while it is still waiting.</p>
          <div className="reference-flow-note">Your booking timeline stays visible in your account, so you can see what has happened and what comes next.</div>
          <Link href="/services" className="button button-primary" style={{ marginTop: 22 }}>Find a repair service <ArrowUpRight size={16}/></Link>
        </div>
        <div className="reference-status-card">
          {stages.map((stage) => <div className="reference-status-row" key={stage.label}>
            <span className={`reference-status-pill reference-status-${stage.tone}`}>{stage.label}</span>
            <p>{stage.detail}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="reference-roles-section">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BUILT FOR EVERY ROLE</span>
            <h2>One platform, three clear workspaces.</h2>
            <p>Customers, technicians and administrators each get the tools and information needed for their part of the repair journey.</p>
          </div>
        </div>
        <div className="reference-roles-grid">
          {roles.map(({ title, text, icon: Icon }) => <article className="reference-role-card" key={title}>
            <span className="process-icon"><Icon size={20}/></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="content-section">
      <div className="shell">
        <div className="trust-panel">
          <div className="trust-copy">
            <span className="eyebrow">THE FIXMATE PRINCIPLE</span>
            <h2>Work first. Payment after.</h2>
            <p>The technician sets the final amount when the work is completed. The customer can then pay through Stripe Checkout.</p>
          </div>
          <div className="trust-points">
            <article className="trust-point"><ShieldCheck size={22}/><h3>Approved listings</h3><p>New and edited technician services are reviewed before publication.</p></article>
            <article className="trust-point"><ClipboardList size={22}/><h3>Visible progress</h3><p>Every booking follows a controlled status pipeline.</p></article>
            <article className="trust-point"><CreditCard size={22}/><h3>Pay after completion</h3><p>Payment is available only for completed, unpaid bookings.</p></article>
          </div>
        </div>
      </div>
    </section>
  </>;
}
