import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// LOGIN API
export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};
