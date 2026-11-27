"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    tailwind?: { config?: Record<string, unknown> };
    __FIXMATE_DEMO_BOOTED__?: boolean;
    FIXMATE_GOOGLE_AUTH_ENABLED?: boolean;
  }
}

const TAILWIND_CONFIG = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#0f172a"
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706"
        }
      }
    }
  }
};

function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Unable to load ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.head.appendChild(script);
  });
}

export function FixMateDemoRoot() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let disposed = false;

    async function boot() {
      try {
        document.body.className = "bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-200";
        window.FIXMATE_GOOGLE_AUTH_ENABLED = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

        const response = await fetch("/fixmate-demo-shell.html", { cache: "force-cache" });
        if (!response.ok) throw new Error("FixMate demo shell could not be loaded.");
        const shell = await response.text();
        if (disposed || !mountRef.current) return;
        mountRef.current.innerHTML = shell;
        const initialViewport = mountRef.current.querySelector<HTMLElement>("#appViewport");
        if (initialViewport) {
          initialViewport.setAttribute("aria-busy", "true");
          initialViewport.innerHTML = `
            <section class="flex min-h-[58vh] w-full items-center justify-center px-5 py-16" role="status" aria-live="polite">
              <div class="w-full max-w-sm rounded-3xl border border-slate-200 bg-white px-7 py-8 text-center shadow-xl shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900">
                <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/25">
                  <svg viewBox="0 0 24 24" class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <p class="font-display text-xl font-extrabold text-slate-900 dark:text-white">Fix<span class="text-blue-600 dark:text-blue-400">Mate</span></p>
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Restoring your session and loading repair services…</p>
                <div class="mx-auto mt-6 h-1.5 w-36 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div class="h-full w-2/5 animate-pulse rounded-full bg-blue-600"></div>
                </div>
              </div>
            </section>
          `;
        }

        // Tailwind's Play CDN reads its config when the script initializes.
        // Define the complete config before loading the CDN script.
        window.tailwind = window.tailwind || {};
        window.tailwind.config = TAILWIND_CONFIG;
        await loadScript("https://cdn.tailwindcss.com/3.4.17", "fixmate-tailwind-cdn");
        if (disposed) return;

        await loadScript("https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js", "fixmate-chartjs");
        if (disposed) return;
        await loadScript("/fixmate-demo.js", "fixmate-demo-runtime");
      } catch (err) {
        if (!disposed) setError(err instanceof Error ? err.message : "FixMate could not be started.");
      }
    }

    void boot();
    return () => {
      disposed = true;
      if (window.__FIXMATE_DEMO_BOOTED__) window.__FIXMATE_DEMO_BOOTED__ = false;
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      {error ? (
        <div className="mx-auto mt-12 max-w-xl rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800" role="alert">
          <strong className="block text-base">FixMate demo could not load</strong>
          <p className="mt-2">{error}</p>
          <button className="mt-4 rounded-lg bg-rose-700 px-4 py-2 font-semibold text-white" onClick={() => window.location.reload()}>
            Reload FixMate
          </button>
        </div>
      ) : (
        <div ref={mountRef} />
      )}
    </div>
  );
}
