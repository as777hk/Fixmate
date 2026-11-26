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
