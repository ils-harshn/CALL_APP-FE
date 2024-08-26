import { authApi } from "../api";
import ENDPOINTS from "../endpoints";

export const getAcceptedConnections = async (params = {}) => {
  const response = await authApi({
    method: "get",
    url: ENDPOINTS.get_accepted_connections,
    params: params,
  });
  return response.data;
};
