import { Task } from "../api/task/data";

async function getData() {
  const base_url =
    "VERCEL_BRANCH_URL" in process.env
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:3000";
  const res = await fetch(`${base_url}/api/task`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data: Task[] = await getData();
  return (
    <>
      <div>
        <h1>task</h1>
        <p>{JSON.stringify(data)}</p>
      </div>
    </>
  );
}
