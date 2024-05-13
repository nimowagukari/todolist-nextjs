export type Task = {
  id: number;
  status: "not_started_yet" | "in_progress" | "closed";
  summary: string;
  description?: string;
};

export const sampleTasks: Task[] = [
  {
    id: 1,
    status: "not_started_yet",
    summary: "summary 1",
    description: "description 1",
  },
  {
    id: 2,
    status: "in_progress",
    summary: "summary 2",
  },
  {
    id: 3,
    status: "closed",
    summary: "summary 3",
    description: "description 3",
  },
];

export default function findTaskById(id: number): Task {
  return sampleTasks[id - 1];
}
