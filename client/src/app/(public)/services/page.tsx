"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { EmptyState } from "@/components/empty-state";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/types";

const categories = ["Smartphone", "Laptop & PC", "AC", "Refrigerator", "TV", "Washing Machine", "Electrical"];
function ServiceBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const page = Number(searchParams.get("page") || 1);
  const updateQuery = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(queryString);
    if (value) params.set(key, value); else params.delete(key);
    if (key !== "page") params.delete("page");
    const next = params.toString();
    router.replace(next ? `/services?${next}` : "/services", { scroll: false });
  }, [queryString, router]);
  useEffect(() => { setSearchInput(searchParams.get("search") || ""); }, [searchParams]);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    apiFetch<{ data: Service[]; pagination: { total: number } }>(`/api/services${queryString ? `?${queryString}` : ""}`)
      .then((result) => { if (alive) { setServices(result.data || []); setTotal(result.pagination?.total || 0); } })
      .catch(() => { if (alive) { setServices([]); setTotal(0); } })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [queryString]);
  const hasFilters = useMemo(() => Boolean(searchParams.get("search") || searchParams.get("category") || searchParams.get("serviceMode") || searchParams.get("sort")), [searchParams]);
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); updateQuery("search", searchInput.trim()); };
  const reset = () => { setSearchInput(""); router.replace("/services"); };
  return <><section className="page-intro"><div className="shell"><span className="eyebrow">SERVICE DIRECTORY / 01</span><h1>Find the right fix.</h1><p>Browse approved repair options, compare the details and choose how you want the work handled.</p></div></section>
    <section className="shell browse-wrap"><form className="search-row" onSubmit={submitSearch}><div className="search-field"><Search size={16}/><input className="search-control" value={searchInput} onChange={(event)=>setSearchInput(event.target.value)} placeholder="Search by service or category" aria-label="Search services"/></div><button type="submit" className="button button-dark"><Search size={15}/> Search</button></form>
      <div className="filter-row"><select className="filter-control" aria-label="Filter by category" value={searchParams.get("category") || ""} onChange={(event)=>updateQuery("category",event.target.value)}><option value="">All categories</option>{categories.map((category)=><option value={category} key={category}>{category}</option>)}</select><select className="filter-control" aria-label="Filter by service mode" value={searchParams.get("serviceMode") || ""} onChange={(event)=>updateQuery("serviceMode",event.target.value)}><option value="">Any service mode</option><option value="Home Visit">Home Visit</option><option value="Shop Drop-off">Shop Drop-off</option></select><select className="filter-control" aria-label="Sort services" value={searchParams.get("sort") || "newest"} onChange={(event)=>updateQuery("sort",event.target.value)}><option value="newest">Newest first</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option></select><span className="filter-result-count"><SlidersHorizontal size={13} style={{verticalAlign:"-2px",marginRight:5}}/>{total} matching services</span>{hasFilters && <button className="button button-quiet button-small" onClick={reset} type="button"><X size={13}/> Reset</button>}</div>
      {loading ? <div className="skeleton-grid">{Array.from({length:6}).map((_,index)=><div key={index} className="skeleton-card"/>)}</div> : services.length ? <><div className="browse-grid">{services.map((service)=><ServiceCard key={service._id} service={service}/>)}</div><div className="pagination"><button disabled={page<=1} onClick={()=>updateQuery("page",String(page-1))}>Previous</button><button className="active">{page}</button><button disabled={services.length<12} onClick={()=>updateQuery("page",String(page+1))}>Next</button></div></> : <EmptyState title="No services match those filters" description="Try another search or clear a filter to see more repair options." actionLabel="Reset filters" actionHref="/services" icon="search"/>}
    </section></>;
}
export default function ServicesPage() { return <Suspense fallback={<div className="loading-block"><span className="loader-ring"/>Loading service filters…</div>}><ServiceBrowser/></Suspense>; }
