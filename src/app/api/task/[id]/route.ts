import { NextRequest, NextResponse } from "next/server";
import findTaskById from "../data";

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const res = NextResponse.json(
    { tasks: findTaskById(context.params.id) },
    { status: 200 },
  );
  return res;
}
