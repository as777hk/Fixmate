import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

export default function NotFound() {
  return <main className="not-found-page"><div className="not-found-art"><Wrench size={52}/><span>404</span></div><span className="eyebrow">WRONG BENCH, WRONG PART</span><h1>We can’t find this page.</h1><p>The address may be outdated, or the service is no longer available. Let’s get you back to a working route.</p><Link className="button button-primary" href="/"><ArrowLeft size={15}/> Back to FixMate</Link></main>;
}
