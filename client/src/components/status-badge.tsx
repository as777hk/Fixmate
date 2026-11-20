import { Check, Clock3, X } from "lucide-react";

const labels: Record<string, string> = { requested: "Requested", accepted: "Accepted", "in-progress": "In progress", completed: "Completed", rejected: "Rejected", cancelled: "Cancelled", pending: "Pending review", approved: "Approved", unpaid: "Unpaid", paid: "Paid" };
export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  const tone = normalized === "approved" || normalized === "completed" || normalized === "paid" ? "success" : normalized === "accepted" ? "indigo" : normalized === "in-progress" || normalized === "pending" || normalized === "unpaid" ? "warning" : normalized === "rejected" ? "danger" : normalized === "cancelled" ? "muted" : "info";
  const Icon = tone === "success" ? Check : tone === "danger" ? X : Clock3;
  return <span className={`status-badge status-${tone}`}><Icon size={12} />{labels[normalized] || status}</span>;
}
