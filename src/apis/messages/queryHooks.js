import { useInfiniteQuery, useMutation } from "react-query";
import QUERY_KEYS from "../queryKeys";
import commonConfig from "../commonConfig";
import {
  getMessagesOnConnection,
  sendMessageOnConnection,
} from "./queryFunction";

export const useGetMessagesOnConnection = (payload = {}, config = {}) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      return getMessagesOnConnection(payload, pageParam);
    },
    queryKey: [QUERY_KEYS.GET_MESSAGES_ON_CONNECTION, payload],
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0
        ? (pages.reduce((sum, arr) => sum + arr.length, 0)) + 1
        : undefined;
    },
    ...commonConfig,
    ...config,
  });

export const useSendMessageOnConnection = (config = {}) =>
  useMutation({
    mutationFn: (payload) => sendMessageOnConnection(payload),
    mutationKey: [QUERY_KEYS.SEND_MESSAGE_ON_CONNECTION],
    ...commonConfig,
    ...config,
  });
