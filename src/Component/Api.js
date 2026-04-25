import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


// 🔐 Attach token BEFORE every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
