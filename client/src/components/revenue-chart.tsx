"use client";

export function RevenueChart({ data, title = "Activity over time", prefix = "", suffix = "" }: { data: { label: string; value: number }[]; title?: string; prefix?: string; suffix?: string }) {
  const values = data.length ? data : [{ label: "No data", value: 0 }];
  const max = Math.max(1, ...values.map((item) => item.value));
  const points = values.map((item, index) => `${values.length === 1 ? 50 : 30 + (index * 560) / (values.length - 1)},${150 - (item.value / max) * 118}`).join(" ");
  return <section className="chart-card"><div className="chart-card-heading"><div><span className="eyebrow">OVERVIEW</span><h3>{title}</h3></div><span className="chart-period">Last {values.length} periods</span></div>
    <div className="chart-canvas"><svg viewBox="0 0 620 190" role="img" aria-label={`${title} chart`} preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity=".23"/><stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs><path d="M 30 32 H 590 M 30 90 H 590 M 30 150 H 590" className="chart-gridline"/><polygon points={`30,150 ${points} 590,150`} fill="url(#chartFill)"/><polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>{values.map((item,index)=><circle key={item.label} cx={values.length===1?310:30+(index*560)/(values.length-1)} cy={150-(item.value/max)*118} r="4" fill="var(--accent)" stroke="var(--surface)" strokeWidth="3"/>)}</svg></div>
    <div className="chart-labels">{values.map((item) => <div key={item.label}><span>{item.label}</span><strong>{prefix}{Number(item.value).toLocaleString("en-US")}{suffix}</strong></div>)}</div>
  </section>;
}
