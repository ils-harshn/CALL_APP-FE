import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URI;

const api = (config) => {
  return axios({
    ...config,
    baseURL: BASE_URL,
  });
};

export default api;
