import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ibb.com" },
      { protocol: "https", hostname: "images.pexels.com" }
    ]
  },
  poweredByHeader: false,
  // Keep browser requests and Better Auth cookies on the frontend's first-party host.
  async rewrites() {
    const apiOrigin = (process.env.INTERNAL_API_URL || "https://as-fixmate-api.vercel.app").replace(/\/$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
