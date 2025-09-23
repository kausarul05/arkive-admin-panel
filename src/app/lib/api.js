import axios from "axios";

// Base API URL
const BASE_API = "https://b8eec97f688a.ngrok-free.app/api/v1";

// Axios instance
const api = axios.create({
  baseURL: BASE_API,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

// Generic API method
export const apiRequest = async (method, endpoint, data = null, config = {}) => {
  // console.log(method, end)
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export default api;
