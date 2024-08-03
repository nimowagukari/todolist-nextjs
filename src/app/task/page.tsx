import { Suspense } from "react";
import { Task } from "@prisma/client";
import Typography from "@mui/material/Typography";
import TaskDashboard from "@/app/task/TaskDashboard";

const base_url =
  "VERCEL_BRANCH_URL" in process.env
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : "http://localhost:3000";

const controller = new AbortController();
const signal = controller.signal;
const fetchTasks = async () => {
  try {
    const res = await fetch(`${base_url}/api/task`, {
      cache: "no-store",
      signal,
    });
    const data = await res.json();
    return data.tasks as Task[];
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.log("Fetch canceled.");
    } else {
      console.log(err);
      throw new Error("Failed to fetch data");
    }
  }
  return [];
};

export default async function Page() {
  const tasks: Task[] = await fetchTasks();

  return (
    <>
      <Typography align="center" variant="h2">
        Tasks
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskDashboard base_url={base_url} initialTasks={tasks} />
      </Suspense>
    </>
  );
}
