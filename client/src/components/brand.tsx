import Link from "next/link";
import { Wrench } from "lucide-react";

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return <Link href="/" className={`brand ${inverse ? "brand-inverse" : ""}`} aria-label="FixMate home">
    <span className="brand-mark"><Wrench size={21} strokeWidth={2.4} /></span>
    {!compact && <span className="brand-word">FixMate<span className="brand-period">.</span><small>REPAIR, CLEARLY</small></span>}
  </Link>;
}
