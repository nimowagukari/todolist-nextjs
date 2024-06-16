import { Task } from "@prisma/client";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";

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

function TaskContent(task: Task) {
  const getStatusColor = (task: Task) => {
    switch (task.status) {
      case "not started yet":
        return "green";
      case "in progress":
        return "orange";
      case "closed":
        return "gray";
      default:
        return "gray";
    }
  };
  return (
    <Card sx={{ height: "250px" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              height: "28px",
              width: "28px",
              bgcolor: getStatusColor(task),
            }}
          >
            <TaskIcon fontSize="small" />
          </Avatar>
        }
        title={task.id + ": " + task.summary}
      />
      <Divider />
      <CardContent>Status：{task.status}</CardContent>
      <CardContent>Description：{task.description}</CardContent>
    </Card>
  );
}

export default async function Page() {
  const data = (await getData()).tasks;
  return (
    <>
      <Typography align="center" variant="h2">
        Tasks
      </Typography>
      <Grid container spacing={3} sx={{ margin: "20px" }}>
        {data.map((task: Task) => {
          return (
            <Grid key={task.id} xs={12} md={4}>
              <TaskContent
                id={task.id}
                summary={task.summary}
                status={task.status}
                description={task.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
