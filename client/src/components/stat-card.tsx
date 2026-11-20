import type { LucideIcon } from "lucide-react";
export function StatCard({ label, value, hint, icon: Icon, tone = "mint" }: { label: string; value: string | number; hint?: string; icon: LucideIcon; tone?: "mint" | "blue" | "amber" | "rose" }) {
  return <article className="stat-card"><div className={`stat-icon stat-${tone}`}><Icon size={19} /></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</div></article>;
}
