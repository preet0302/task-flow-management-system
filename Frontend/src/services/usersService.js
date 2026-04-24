// services/userService.js
import API from "../api/axios";

export const getUsersAPI = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const deleteUserAPI = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};

export const updateUserAPI = async ({ id, data }) => {
  const res = await API.patch(`/users/${id}`, data);
  return res.data;
};