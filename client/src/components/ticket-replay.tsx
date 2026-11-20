"use client";

import { useEffect, useState } from "react";

const stages = [
  { label: "Request received", status: "Requested", tone: "requested" },
  { label: "Technician confirmed", status: "Accepted", tone: "accepted" },
  { label: "Repair is underway", status: "In Progress", tone: "in-progress" },
  { label: "Repair completed", status: "Completed", tone: "completed" },
  { label: "Payment confirmed", status: "Paid", tone: "paid" }
];

export function TicketReplay() {
  const [activeStage, setActiveStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setActiveStage((current) => Math.min(current + 1, stages.length - 1));
    }, 1800);
    return () => window.clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (activeStage === stages.length - 1) setPlaying(false);
  }, [activeStage]);

  const replay = () => {
    setActiveStage(0);
    setPlaying(true);
  };

  const current = stages[activeStage];

  return (
    <section className="hm-ticket-card" aria-label="Live repair ticket example">
      <div className="hm-ticket-topline">
        <span className="hm-ticket-live"><i /> LIVE REPAIR TRACKER</span>
        <span className="hm-ticket-number mono">#FM-1042</span>
      </div>
      <div className="hm-ticket-content">
        <div>
          <span className="hm-ticket-service">Smartphone · Screen repair</span>
          <strong className="hm-ticket-current" aria-live="polite">{current.label}</strong>
        </div>
        <span className={`hm-ticket-state status-${current.tone}`}>{current.status}</span>
      </div>
      <div className="hm-ticket-progress" aria-label={`Stage ${activeStage + 1} of ${stages.length}`}>
        {stages.map((stage, index) => (
          <span key={stage.tone} className={index <= activeStage ? "is-complete" : ""} />
        ))}
      </div>
      <div className="hm-ticket-bottom">
        <span>{activeStage + 1} of {stages.length} repair updates</span>
        <button type="button" onClick={replay}>↻ Replay job</button>
      </div>
    </section>
  );
}
