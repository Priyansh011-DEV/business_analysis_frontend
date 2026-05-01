import axios from "axios";

// ✅ Safe base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ✅ Axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔥 Optional: auto attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= AUTH APIs =================

// 🔐 Login
export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);

    console.log("LOGIN RESPONSE:", response.data); // debug

    return response.data; // ✅ ONLY return, don’t store here
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// 📝 Register
export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};