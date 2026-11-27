import type { Metadata, Viewport } from "next";
import { FixMateDemoRoot } from "@/components/fixmate-demo-root";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FixMate — Smart Device & Home Appliance Repair Service Platform", template: "%s | FixMate" },
  description: "A complete FixMate repair-service demo with customer, technician and admin workflows.",
  applicationName: "FixMate",
  icons: { icon: [{ url: "/fixmate-brand-icon.svg", type: "image/svg+xml" }], shortcut: "/fixmate-brand-icon.svg" },
  openGraph: {
    title: "FixMate — Smart Device & Home Appliance Repair Service Platform",
    description: "Browse repair services, track bookings and manage technician workflows.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // The supplied HTML is the single source of truth for the demo UI and its SPA routes.
  // Existing Next.js route modules remain in the repository for the connected backend app.
  void children;
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <FixMateDemoRoot />
      </body>
    </html>
  );
}
