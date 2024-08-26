import { useInfiniteQuery } from "react-query";
import { getAcceptedConnections } from "./queryFunction";
import QUERY_KEYS from "../queryKeys";
import commonConfig from "../commonConfig";

export const useGetAcceptedConnections = (config = {}) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) => {
      return getAcceptedConnections({
        limit: 10,
        offset: pageParam,
      });
    },
    queryKey: [QUERY_KEYS.GET_ACCEPTED_CONNECTIONS, config],
    ...commonConfig,
    ...config,
  });
