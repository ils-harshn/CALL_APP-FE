import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URI;

const api = (config) => {
  return axios({
    ...config,
    baseURL: BASE_URL,
  });
};

export const authApi = (config) => {
  const token = localStorage.getItem("token");

  const defaultConfig = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    defaultConfig.headers["Authorization"] = `Bearer ${token}`;
  }

  return axios({
    ...defaultConfig,
    ...config,
  });
};

export default api;
