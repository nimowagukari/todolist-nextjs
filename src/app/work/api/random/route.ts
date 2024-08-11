import { NextResponse } from "next/server";

function getRandomIntInclusive(first: number, last: number): number {
  first = Math.ceil(first);
  last = Math.floor(last);
  return Math.floor(Math.random() * (last - first + 1) + first);
}

export async function GET() {
  const waitSec: number = getRandomIntInclusive(2, 4);
  const randomInt: Promise<number> = new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandomIntInclusive(1, 10));
    }, waitSec * 1000);
  });
  const res = NextResponse.json({ second: await randomInt }, { status: 200 });
  return res;
}
