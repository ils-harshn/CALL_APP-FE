import api from "../api";
import ENDPOINTS from "../endpoints";

export const registerUser = async (payload) => {
  const response = await api({
    method: "post",
    url: ENDPOINTS.register,
    data: payload,
  });
  return response.data;
};
