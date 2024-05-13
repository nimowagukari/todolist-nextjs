import { Task } from "../api/task/data";

async function getData() {
  const res = await fetch("http://localhost:3000/api/task");

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
