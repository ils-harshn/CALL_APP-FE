import { useMutation } from "react-query";
import QUERY_KEYS from "../queryKeys";
import {
  registerUser,
  resendVerifyEmailOTP,
  verifyEmail,
} from "./queryFunction";

const commonConfig = {
  retry: false,
  refetchOnWindowFocus: false,
};

export const useRegisterMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => registerUser(payload),
    mutationKey: [QUERY_KEYS.REGISTER],
    ...commonConfig,
    ...config,
  });

export const useVerifyEmailMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => verifyEmail(payload),
    mutationKey: [QUERY_KEYS.VERIFY_EMAIL],
    ...commonConfig,
    ...config,
  });

export const useResendVerifyEmailOTPMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => resendVerifyEmailOTP(payload),
    mutationKey: [QUERY_KEYS.RESEND_VERIFY_EMAIL_OTP],
    ...commonConfig,
    ...config,
  });
