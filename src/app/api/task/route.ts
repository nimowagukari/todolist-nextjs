import { NextResponse } from "next/server";
import { sampleTasks } from "./data";

export async function GET() {
  const res = NextResponse.json({ tasks: sampleTasks }, { status: 200 });
  return res;
}
