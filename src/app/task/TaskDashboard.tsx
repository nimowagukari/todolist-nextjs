"use client";
import { useState, Suspense } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import { Task } from "@prisma/client";
import { TaskCard } from "@/components/Task";
import { updateTask } from "@/app/task/ServerComponents";

type TaskWithoutId = Omit<Task, "id">;

export default function TaskDashboard({
  base_url,
  initialTasks,
}: {
  base_url: string;
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAdd = () => {
    const addTask = async () => {
      try {
        const initialTask: TaskWithoutId = {
          summary: "task name",
          status: "not started yet",
          description: "task description",
        };
        const res = await fetch(`${base_url}/api/task`, {
          method: "POST",
          body: JSON.stringify(initialTask),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTasks([...tasks, data.task]);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to add data");
      }
    };
    addTask();
  };

  const handleUpdate = (task: Task) => {
    // const updateTask = async (task: Task) => {
    //   const { id, ...updatedTask } = task;
    //   try {
    //     const res = await fetch(`${base_url}/api/task/${task.id}`, {
    //       method: "PUT",
    //       body: JSON.stringify(updatedTask),
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await res.json();
    //     const newTasks = tasks.map((item) =>
    //       item.id == task.id ? data.task : item,
    //     );
    //     setTasks(newTasks);
    //   } catch (err) {
    //     console.log(err);
    //     throw new Error("Failed to update data");
    //   }
    // };

    const updatedTask = updateTask(task);
    const newTasks = tasks.map((oldTask) => {
      return oldTask.id == task.id ? updatedTask : oldTask;
    });
    setTasks(newTasks);
  };

  const handleDelete = (id: number) => {
    const deleteTask = async (id: number) => {
      try {
        await fetch(`${base_url}/api/task/${id}`, {
          method: "DELETE",
        });
        const newData = tasks.filter((item) => item.id != id);
        setTasks(newData);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to delete data");
      }
    };
    deleteTask(id);
  };

  return (
    <>
      <Stack sx={{ marginX: "32px" }}>
        <Button variant="contained" onClick={handleAdd} sx={{ width: "150px" }}>
          Add Task
        </Button>
      </Stack>
      <Grid container spacing={3} sx={{ margin: "20px" }}>
        {tasks.length > 0
          ? tasks.map((task: Task) => {
              return (
                <Grid key={task.id} xs={12} md={4}>
                  <Suspense key={task.id} fallback={<div>Loading...</div>}>
                    <TaskCard
                      task={task}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      isEditing={false}
                    />
                  </Suspense>
                </Grid>
              );
            })
          : null}
      </Grid>
    </>
  );
}
