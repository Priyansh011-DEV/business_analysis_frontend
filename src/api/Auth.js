import axios from "axios";

// 🔥 Use env variable
const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

// LOGIN API
export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};