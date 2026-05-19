import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isBlockedHostname(hostname: string) {
  const normalized = hostname.toLowerCase();

  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.endsWith(".localhost") ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(normalized)
  );
}

function getSafeTargetUrl(value: string | null) {
  if (!value) return null;

  try {
    const targetUrl = new URL(value);

    if (targetUrl.protocol !== "https:" || isBlockedHostname(targetUrl.hostname)) {
      return null;
    }

    return targetUrl;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const targetUrl = getSafeTargetUrl(request.nextUrl.searchParams.get("url"));

  if (!targetUrl) {
    return NextResponse.json({ error: "Invalid PDF URL" }, { status: 400 });
  }

  const upstreamResponse = await fetch(targetUrl, {
    cache: "no-store",
    headers: {
      accept: "application/pdf,*/*",
      "user-agent": "bcanotes-pdf-viewer",
    },
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return NextResponse.json(
      { error: "Unable to load PDF" },
      { status: upstreamResponse.status || 502 }
    );
  }

  const contentType = upstreamResponse.headers.get("content-type") || "application/pdf";

  return new NextResponse(upstreamResponse.body, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "content-disposition": "inline",
    },
  });
}
