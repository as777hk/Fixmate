"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = window.localStorage.getItem("fixmate-theme");
    if (saved === "dark" || saved === "light") document.documentElement.dataset.theme = saved;
  }, []);
  return <>
    {children}
    <Toaster position="top-right" richColors closeButton theme="system" />
  </>;
}
