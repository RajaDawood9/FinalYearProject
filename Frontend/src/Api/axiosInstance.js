import axios from "axios";

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
  timeout: 1000,
  withCredentials: true,
});

export default axiosInstance;
