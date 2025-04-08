import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get("user-agent") || "";
    const platformHeader = request.headers.get("sec-ch-ua-platform");

    // Return a 500 error if:
    // 1. The "sec-ch-ua-platform" header does not exist
    // 2. The User-Agent does not contain "curl"
    if (!platformHeader && !userAgent.includes("curl")) {
        return new NextResponse("Internal Server Error", {
            status: 500,
        });
    }

    // Allow the request to proceed
    return NextResponse.next();
}
