import { Check, Circle } from "lucide-react";
import type { Booking } from "@/types";
const stages = ["requested", "accepted", "in-progress", "completed", "paid"];
const display = ["Request sent", "Accepted", "Work started", "Repair complete", "Payment received"];
export function BookingTimeline({ booking }: { booking: Booking }) {
  const terminal = booking.status === "rejected" || booking.status === "cancelled";
  const current = booking.paymentStatus === "paid" ? 4 : stages.indexOf(booking.status);
  return <div className={`booking-timeline ${terminal ? "timeline-terminal" : ""}`}>
    {stages.map((stage, index) => {
      const done = !terminal && index <= current;
      const history = booking.statusHistory?.find((item) => item.status === stage);
      return <div className={`timeline-step ${done ? "is-done" : ""} ${index === current ? "is-current" : ""}`} key={stage}>
        <span className="timeline-node">{done ? <Check size={13} /> : <Circle size={9} />}</span>
        <span className="timeline-label">{display[index]}</span>
        {history && <small>{new Date(history.changedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small>}
      </div>;
    })}
    {terminal && <div className="timeline-terminal-note">This request was {booking.status}.</div>}
  </div>;
}
