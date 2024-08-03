"use server";

import { Task } from "@prisma/client";

const base_url =
  "VERCEL_BRANCH_URL" in process.env
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : "http://localhost:3000";

export async function updateTask(task: Task) {
  const { id, ...taskWithoutId } = task;

  try {
    const res = await fetch(`${base_url}/api/task/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(taskWithoutId),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.task as Task;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update data");
  }
}
