import api from "../api/axios";

export const getUsersAPI = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const deleteUserAPI = async (id) => {
  await api.delete(`/users/${id}`);
};

export const updateUserAPI = async (id, payload) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data;
};