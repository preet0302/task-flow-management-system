import api from "../api/axios";

// create task
export const createTaskAPI = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

// get all tasks
export const getTasksAPI = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

// update task
export const updateTaskAPI = async (id, payload) => {
  const { data } = await api.patch(`/tasks/${id}`, payload);
  return data;
};

// delete task
export const deleteTaskAPI = async (id) => {
  await api.delete(`/tasks/${id}`);
};