import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Task } from "@prisma/client";

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

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } },
) {
  try {
    const req = await request.json();
    const task = await prisma.task.update({
      where: { id: Number(context.params.id) },
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

export async function DELETE(
  request: NextRequest,
  context: { params: { id: number } },
) {
  try {
    const result = await prisma.task.delete({
      where: { id: Number(context.params.id) },
    });
    const res = NextResponse.json({ result: result }, { status: 200 });
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
