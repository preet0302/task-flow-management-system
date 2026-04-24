// features/task/taskService.js
import API from "../api/axios";

// CREATE
export const createTaskAPI = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

// GET
export const getTasksAPI = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// UPDATE
export const updateTaskAPI = async ({ id, data }) => {
  const res = await API.patch(`/tasks/${id}`, data);
  return res.data;
};

// DELETE
export const deleteTaskAPI = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};