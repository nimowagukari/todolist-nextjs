import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { id: number } },
) {
  const task = await prisma.task.findUnique({
    where: { id: Number(context.params.id) },
  });
  const res = NextResponse.json({ task: task }, { status: 200 });
  return res;
}
