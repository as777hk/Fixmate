import Link from "next/link";
import { Search, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  title = "Nothing here yet",
  description = "When there is activity, it will appear here.",
  actionLabel,
  actionHref,
  icon = "wrench",
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: "wrench" | "search" | LucideIcon;
}) {
  const Icon = typeof icon === "string" ? (icon === "search" ? Search : Wrench) : icon;

  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon size={23} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && actionHref && (
        <Link className="button button-primary button-small" href={actionHref}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
