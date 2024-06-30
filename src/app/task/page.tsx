import Typography from "@mui/material/Typography";
import TaskDashboard from "@/app/task/TaskDashboard";

export default function Page() {
  const base_url =
    "VERCEL_BRANCH_URL" in process.env
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : "http://localhost:3000";

  return (
    <>
      <Typography align="center" variant="h2">
        Tasks
      </Typography>
      <TaskDashboard base_url={base_url} />
    </>
  );
}
