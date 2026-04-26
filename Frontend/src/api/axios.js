import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
 baseURL: "https://task-backend-1-rija.onrender.com/api", 
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

    
   if (message && status !== 401 && status !== 403) {
      toast.error(message);
    }

   
    if (status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    
    if (status === 403) {
       toast.error(message || "Access denied ❌")
      
    }

    return Promise.reject(error);
  }
);

export default api;
