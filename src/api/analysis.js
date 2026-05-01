import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: BASE_URL,
});

// 🔥 Upload + Compare API
export const uploadAndCompare = async (pastFile, targetFile) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }

  const formData = new FormData();
  formData.append("past", pastFile);
  formData.append("target", targetFile);

  return await API.post("apiv2/compare", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};