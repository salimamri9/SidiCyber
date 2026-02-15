import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply to extension-specific API routes
  if (request.nextUrl.pathname.startsWith("/api/analyze")) {
    console.log(`📡 [MIDDLEWARE] Incoming ${request.method} request for /api/analyze`);
    const origin = request.headers.get("origin");
    const extensionKey = request.headers.get("x-extension-key");
    const storedKey = process.env.EXTENSION_API_KEY;

    console.log(`   Origin: ${origin}`);
    console.log(`   Extension Key Provided: ${extensionKey ? "Yes" : "No"}`);

    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*", // More permissive for local dev
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, x-extension-key, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 2. Validate API Key for Extension requests
    // We allow normal web app requests without the key if they don't have the 'x-extension-key' header
    // but if the header is present, it must match.
    if (extensionKey && extensionKey !== storedKey) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid Extension Key" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Add CORS headers to the response
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, x-extension-key, Authorization");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
