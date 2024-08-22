import { authApi } from "../api";
import ENDPOINTS from "../endpoints";

export const searchFriends = async (payload, pageParam) => {
  const response = await authApi({
    method: "get",
    url: ENDPOINTS.search_friends,
    params: {
      page: pageParam,
      limit: 10,
      username: payload?.username || "",
      searchFor: payload?.searchFor || "search",
    },
  });
  return response.data;
};

export const sendConnectionRequest = async (payload) => {
  const response = await authApi({
    method: "post",
    url: ENDPOINTS.send_connection_request,
    data: payload,
  });
  return response.data;
};
