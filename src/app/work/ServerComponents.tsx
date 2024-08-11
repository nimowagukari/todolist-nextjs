"use server";
import { Task } from "@prisma/client";

export async function fetchTasks() {
  try {
    const res = await fetch("http://localhost:3000/api/task", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.tasks as Task[];
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchRandom() {
  try {
    const res = await fetch("http://localhost:3000/work/api/random", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.second as number;
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchRandomArray() {
  return await Promise.all([fetchRandom(), fetchRandom(), fetchRandom()]);
}

export async function echoRandom() {
  console.log(Math.random());
}
