// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true, // 🔥 MUST for cookie auth
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
   
//       if (error.response.status === 401) {
//         window.location.href = "/login";
//       }

    
//       if (error.response.status === 403) {
//         window.location.href = "/unauthorized";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ NO redirect here
    return Promise.reject(error);
  }
);

export default api;