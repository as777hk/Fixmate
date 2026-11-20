import { NextRequest } from "next/server";

const API_URL = (process.env.INTERNAL_API_URL || process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function proxy(request: NextRequest, context: { params: Promise<{ all: string[] }> }) {
  const { all } = await context.params;
  const incoming = new URL(request.url);
  const path = all.map((part) => encodeURIComponent(part)).join("/");
  const target = `${API_URL}/api/auth/${path}${incoming.search}`;
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.set("origin", request.headers.get("origin") || incoming.origin);

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    cache: "no-store",
    redirect: "manual"
  });
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  return new Response(request.method === "HEAD" ? null : await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
