"use client";
import { Task } from "@prisma/client";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import TaskIcon from "@mui/icons-material/Task";
import TextField from "@mui/material/TextField";

export function TaskCard({
  task,
  onUpdate,
  onDelete,
  isEditing,
}: {
  task: Task;
  onUpdate: any;
  onDelete: any;
  isEditing: boolean;
}) {
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

  const updateEditingTaskSummary = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, summary: e.target.value });
  };

  const updateEditingTaskStatus = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, status: e.target.value });
  };

  const updateEditingTaskDescription = (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    setEditingTask({ ...editingTask, description: e.target.value });
  };

  const [editing, setEditing] = useState(isEditing);
  const [editingTask, setEditingTask] = useState(task);

  const handleUpdate = () => {
    onUpdate(editingTask);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Card sx={{ height: "350px" }}>
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
        title={
          <>
            {task.id}:
            {editing ? (
              <TextField
                label="summary"
                defaultValue={task.summary}
                variant="outlined"
                size="small"
                onBlur={updateEditingTaskSummary}
              />
            ) : (
              <>{task.summary}</>
            )}
          </>
        }
      />
      <Divider />
      <CardContent>
        {editing ? (
          <TextField
            label="status"
            defaultValue={task.status}
            variant="outlined"
            onBlur={updateEditingTaskStatus}
          />
        ) : (
          <>Status: {task.status}</>
        )}
      </CardContent>
      <CardContent>
        {editing ? (
          <TextField
            label="description"
            defaultValue={task.description}
            variant="outlined"
            multiline
            onBlur={updateEditingTaskDescription}
          />
        ) : (
          <>Description: {task.description}</>
        )}
      </CardContent>
      <CardActions>
        {editing ? (
          <IconButton onClick={handleUpdate}>
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setEditing(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        {editing ? (
          <IconButton onClick={() => setEditing(false)}>
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
