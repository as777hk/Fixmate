export function SectionHeading({ eyebrow, title, description, align = "left", action }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; action?: React.ReactNode }) {
  return <div className={`section-heading section-heading-${align}`}>
    <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>
    {action && <div className="section-heading-action">{action}</div>}
  </div>;
}
