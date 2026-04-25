import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
     if (!error.response) {
      toast.error("Network error. Please check your connection ❌");
      return Promise.reject(error);
    }
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // 🔥 SHOW ERROR MESSAGE (GLOBAL)
   if (message && status !== 401 && status !== 403) {
      toast.error(message);
    }

    // 🔐 Unauthorized
    if (status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    // 🔐 Forbidden
    if (status === 403) {
      window.location.href = "/unauthorized";
    }

    return Promise.reject(error);
  }
);

export default api;