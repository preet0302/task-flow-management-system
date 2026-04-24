import api from "../api/axios";

// REGISTER
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// LOGOUT
export const logoutUser = () => {
  return api.post("/auth/logout");
};