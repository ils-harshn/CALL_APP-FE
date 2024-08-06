import axios from "axios";
const BASE_URL = "http://localhost:8000";

const api = (config) => {
  return axios({
    ...config,
    baseURL: BASE_URL,
  });
};

export default api;
