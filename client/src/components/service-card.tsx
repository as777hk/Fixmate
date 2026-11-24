import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Wrench } from "lucide-react";
import type { Service } from "@/types";
import { money } from "@/lib/api";

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return <article className={`service-card ${compact ? "service-card-compact" : ""}`}>
    <Link href={`/services/${service._id}`} className="service-image-wrap">
      <Image src={service.image || "/images/repair-placeholder.svg"} alt={service.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={85} />
      <span className="service-category">{service.category}</span>
      <span className="service-mode-chip"><Wrench size={12} /> {service.serviceMode}</span>
    </Link>
    <div className="service-card-body">
      <div className="service-title-row"><h3><Link href={`/services/${service._id}`}>{service.title}</Link></h3><span className="service-price">{money(service.basePrice)}<small>from</small></span></div>
      <div className="service-meta"><span><Clock3 size={14} /> {service.estimatedDuration}</span><span><MapPin size={14} /> {service.serviceArea}</span></div>
      <div className="service-card-bottom"><span className="technician-name"><span className="technician-dot" /> {service.technicianName}</span><Link className="service-detail-link" href={`/services/${service._id}`} aria-label={`View ${service.title}`}>Details <ArrowUpRight size={15} /></Link></div>
    </div>
  </article>;
}
