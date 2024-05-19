import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  const res = NextResponse.json({ tasks: tasks }, { status: 200 });
  return res;
}
