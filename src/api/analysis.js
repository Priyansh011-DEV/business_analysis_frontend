import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 🔥 Upload + Compare API
export const uploadAndCompare = async (pastFile, targetFile) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found. Please login again.");
  }

  const formData = new FormData();
  formData.append("past", pastFile);     // MUST match backend
  formData.append("target", targetFile); // MUST match backend

  try {
    const response = await axios.post(
      `${BASE_URL}/apiv2/compare`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 explicitly added
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;

  } catch (error) {
    console.error("Upload error:", error?.response || error);

    // Better debugging
    if (error.response?.status === 403) {
      throw new Error("Unauthorized request (403). Check token or backend security.");
    }

    throw error;
  }
};