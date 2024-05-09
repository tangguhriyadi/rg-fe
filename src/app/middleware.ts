import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl;
    nextUrl.searchParams.delete("rating4");
    nextUrl.searchParams.delete("stock");
    nextUrl.searchParams.delete("sort");
    return NextResponse.rewrite(nextUrl);
}
