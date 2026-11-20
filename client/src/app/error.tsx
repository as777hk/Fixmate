"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="not-found-page"><div className="not-found-art"><AlertTriangle size={52}/><span>!</span></div><span className="eyebrow">TEMPORARY INTERRUPTION</span><h1>Something needs a second look.</h1><p>We couldn’t load this part of FixMate. Your account and repair records have not been changed by this screen.</p><div className="not-found-actions"><button className="button button-primary" onClick={reset}><RefreshCw size={15}/> Try again</button><Link className="button button-quiet" href="/">Back to home</Link></div></main>;
}
