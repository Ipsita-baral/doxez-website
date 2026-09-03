import { NextResponse } from "next/server";

const BACKEND_URL = (
  process.env.BACKEND_API_URL ||
  "https://doxez.in"
).replace(/\/+$/, "").replace(/\/api$/, "");

async function handleProxy(req, context) {
  const params = await context.params;
  const pathSegments = Array.isArray(params.path) ? params.path.join("/") : params.path;
  const url = new URL(req.url);
  const targetUrl = `${BACKEND_URL}/api/${pathSegments}${url.search}`;

  const headers = new Headers();
  // Pass along important client headers
  for (const [key, value] of req.headers.entries()) {
    if (!["host", "origin", "referer"].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  // Set Origin and Host to the allowed backend domain so CORS in AWS ECS succeeds
  const backendParsed = new URL(BACKEND_URL);
  headers.set("host", backendParsed.host);
  headers.set("origin", backendParsed.origin);
  headers.set("referer", `${backendParsed.origin}/`);

  const options = {
    method: req.method,
    headers,
    redirect: "follow",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    options.body = await req.arrayBuffer();
  }

  try {
    const res = await fetch(targetUrl, options);
    const resHeaders = new Headers(res.headers);
    resHeaders.delete("content-encoding");
    resHeaders.delete("content-length");

    const data = await res.arrayBuffer();
    return new NextResponse(data, {
      status: res.status,
      headers: resHeaders,
    });
  } catch (err) {
    console.error("Proxy error to backend:", err);
    return NextResponse.json(
      { success: false, message: "Backend communication error" },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
