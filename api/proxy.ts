import type { VercelRequest, VercelResponse } from "@vercel/node";

const HOP_BY_HOP_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "x-proxy-target",
]);

const BLOCKED_RESPONSE_HEADERS = new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "content-encoding",
  "content-length",
]);

const handle = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, method, headers: requestHeaders, body } = req.body;

  if (!url || !method) {
    return res.status(400).json({ error: "Missing url or method" });
  }

  let targetUrl: URL;
  // Only allow http(s) urls
  try {
    targetUrl = new URL(url);
    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return res
        .status(400)
        .json({ error: "Only HTTP and HTTPS targets are supported" });
    }
  } catch {
    return res.status(400).json({ error: "Invalid target URL" });
  }
  const forwardedHeaders: Record<string, string> = {};
  if (requestHeaders && typeof requestHeaders === "object") {
    for (const [key, value] of Object.entries(requestHeaders)) {
      if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
        forwardedHeaders[key] = value as string;
      }
    }
  }
  try {
    const methodsWithBody = ["POST", "PUT", "PATCH"];
    const hasBody = methodsWithBody.includes(method.toUpperCase());

    const targetResponse = await fetch(targetUrl.toString(), {
      method: method.toUpperCase(),
      headers: forwardedHeaders,
      body: hasBody && body ? body : undefined,
    });
    targetResponse.headers.forEach((value, key) => {
      if (!BLOCKED_RESPONSE_HEADERS.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });
    res.setHeader("x-proxied-by", "reqlab");

    const responseBody = await targetResponse.text();
    return res.status(targetResponse.status).send(responseBody);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to reach target";
    return res.status(502).json({
      error: "Proxy could not reach target",
      detail: message,
    });
  }
};

export default handle;
