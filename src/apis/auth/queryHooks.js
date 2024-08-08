import { useMutation, useQuery } from "react-query";
import QUERY_KEYS from "../queryKeys";
import {
  login,
  profile,
  registerUser,
  resendVerifyEmailOTP,
  verifyEmail,
} from "./queryFunction";
import commonConfig from "../commonConfig";

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

export const useLoginMutation = (config = {}) =>
  useMutation({
    mutationFn: (payload) => login(payload),
    mutationKey: [QUERY_KEYS.LOGIN],
    ...commonConfig,
    ...config,
  });

export const useProfile = (config = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: profile,
    ...commonConfig,
    ...config,
  });
