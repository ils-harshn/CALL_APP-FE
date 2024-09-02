import { useInfiniteQuery } from "react-query";
import { getAcceptedConnections } from "./queryFunction";
import QUERY_KEYS from "../queryKeys";
import commonConfig from "../commonConfig";

export const useGetAcceptedConnections = (limit = 10, config = {}) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) => {
      return getAcceptedConnections({
        limit: limit,
        offset: pageParam,
      });
    },
    queryKey: [QUERY_KEYS.GET_ACCEPTED_CONNECTIONS],
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0
        ? pages.reduce((sum, arr) => sum + arr.length, 0) + 1
        : undefined;
    },
    ...commonConfig,
    ...config,
  });
