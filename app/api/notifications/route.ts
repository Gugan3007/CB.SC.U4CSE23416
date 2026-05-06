import { NextRequest, NextResponse } from "next/server";
import { Log } from "@/lib/logger";

const BACKEND_URL = "http://20.207.122.201/evaluation-service/notifications";

export async function GET(request: NextRequest): Promise<NextResponse> {
  Log("frontend", "info", "api", "Proxy route /api/notifications called");

  try {
    
    const { searchParams } = new URL(request.url);
    const proxyParams = new URLSearchParams();

    
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const notificationType = searchParams.get("notification_type");

    if (limit) proxyParams.set("limit", limit);
    if (page) proxyParams.set("page", page);
    if (notificationType) proxyParams.set("notification_type", notificationType);

    const queryString = proxyParams.toString();
    const targetUrl = `${BACKEND_URL}${queryString ? `?${queryString}` : ""}`;

    Log("frontend", "debug", "api", `Proxy forwarding to: ${targetUrl}`);

    
    const { getAuthHeader } = await import("@/lib/config");
    const authHeader = getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(targetUrl, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "Unknown error");
      Log(
        "frontend",
        "error",
        "api",
        `Proxy: backend responded with ${response.status}: ${errorBody}`
      );
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: errorBody },
        { status: response.status }
      );
    }

    const data = await response.json();
    Log(
      "frontend",
      "info",
      "api",
      `Proxy: successfully forwarded ${data.notifications?.length ?? 0} notifications`
    );

    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown proxy error";
    Log("frontend", "error", "api", `Proxy error: ${message}`);

    return NextResponse.json(
      { error: "Proxy failed to reach backend", details: message },
      { status: 502 }
    );
  }
}
