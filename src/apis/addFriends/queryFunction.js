import { authApi } from "../api";
import ENDPOINTS from "../endpoints";

export const searchFriends = async (payload) => {
  const response = await authApi({
    method: "get",
    url: ENDPOINTS.search_friends,
    params: {
      page: payload?.page || 1,
      limit: payload?.limit || 10,
      username: payload?.username || "",
    },
  });
  return response.data;
};
