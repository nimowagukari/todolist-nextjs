import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ id: "asc" }],
  });
  const res = NextResponse.json({ tasks: tasks }, { status: 200 });
  return res;
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const task = await prisma.task.create({
      data: req,
    });
    const res = NextResponse.json({ task: task }, { status: 200 });
    return res;
  } catch (err: any) {
    console.log(err);
    const res = NextResponse.json(
      { error: { message: err.message, stack: err.stack } },
      { status: 400 },
    );
    return res;
  }
}
