import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// OPTIONAL: attach token automatically to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const uploadAndCompare = async (pastFile, targetFile) => {
  const formData = new FormData();

  formData.append("past", pastFile);
  formData.append("target", targetFile);

  return await API.post("/apiv2/compare", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};