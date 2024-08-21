import { useInfiniteQuery } from "react-query";
import QUERY_KEYS from "../queryKeys";
import commonConfig from "../commonConfig";
import { searchFriends } from "./queryFunction";

export const useSearchFriends = (payload = {}, config = {}) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      return searchFriends(payload, pageParam);
    },
    queryKey: [QUERY_KEYS.SEARCH_FRIENDS, payload],
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
    ...commonConfig,
    ...config,
  });
