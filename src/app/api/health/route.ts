import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = NextResponse.json(
    { status: "healthy", href: request.nextUrl.href },
    { status: 200 },
  );
  return res;
}
