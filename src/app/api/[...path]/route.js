import { NextResponse } from "next/server";
import https from "https";
import http from "http";

const BACKEND_URL = (
  process.env.BACKEND_API_URL ||
  "https://doxez.in"
).replace(/\/+$/, "").replace(/\/api$/, "");

function proxyRequest({ url, method, headers, body }) {
  return new Promise((resolve, reject) => {
    const targetUrl = new URL(url);
    const isHttps = targetUrl.protocol === "https:";
    const transport = isHttps ? https : http;

    const isAwsElb = targetUrl.hostname.includes("elb.amazonaws.com");
    const targetHost = process.env.BACKEND_HOST_HEADER || (isAwsElb ? "doxez.in" : targetUrl.host);

    const reqHeaders = { ...headers };
    reqHeaders["host"] = targetHost;
    reqHeaders["origin"] = `${targetUrl.protocol}//${targetHost}`;
    reqHeaders["referer"] = `${targetUrl.protocol}//${targetHost}/`;

    const options = {
      protocol: targetUrl.protocol,
      hostname: targetUrl.hostname,
      port: targetUrl.port || (isHttps ? 443 : 80),
      path: targetUrl.pathname + targetUrl.search,
      method,
      headers: reqHeaders,
      servername: targetHost,
      rejectUnauthorized: false,
    };

    const req = transport.request(options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode || 200,
          headers: res.headers,
          data: Buffer.concat(chunks),
        });
      });
    });

    req.on("error", reject);

    if (body && body.length > 0) {
      req.write(body);
    }
    req.end();
  });
}

async function handleProxy(req, context) {
  try {
    const params = await context.params;
    const pathSegments = Array.isArray(params.path) ? params.path.join("/") : params.path;
    const url = new URL(req.url);
    const targetUrl = `${BACKEND_URL}/api/${pathSegments}${url.search}`;

    const headers = {};
    for (const [key, value] of req.headers.entries()) {
      const lowerKey = key.toLowerCase();
      if (!["host", "origin", "referer", "content-length"].includes(lowerKey)) {
        headers[lowerKey] = value;
      }
    }

    let body = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const arrayBuffer = await req.arrayBuffer();
      body = Buffer.from(arrayBuffer);
      headers["content-length"] = body.length;
    }

    const res = await proxyRequest({
      url: targetUrl,
      method: req.method,
      headers,
      body,
    });

    const resHeaders = new Headers();
    for (const [key, value] of Object.entries(res.headers)) {
      if (value !== undefined) {
        const lower = key.toLowerCase();
        if (!["content-encoding", "content-length", "transfer-encoding"].includes(lower)) {
          if (Array.isArray(value)) {
            for (const v of value) resHeaders.append(key, v);
          } else {
            resHeaders.set(key, value);
          }
        }
      }
    }

    return new NextResponse(res.data, {
      status: res.statusCode,
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

