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

export const verifyEmail = async (payload) => {
  const response = await api({
    method: "post",
    url: ENDPOINTS.verifyemail,
    data: payload,
  });
  return response.data;
};

export const resendVerifyEmailOTP = async (payload) => {
  const response = await api({
    method: "post",
    url: ENDPOINTS.resendverifyemailOTP,
    data: payload,
  });
  return response.data;
};
