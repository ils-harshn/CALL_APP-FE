import { useMutation } from "react-query";
import QUERY_KEYS from "../queryKeys";
import { registerUser } from "./queryFunction";

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
