import { authApi } from "../api";
import ENDPOINTS from "../endpoints";

export const getMessagesOnConnection = async (payload, pageParam) => {
  const response = await authApi({
    method: "get",
    url: ENDPOINTS.get_messages_on_connection,
    params: {
      offset: pageParam,
      limit: 50,
      connection_id: payload?.on,
    },
  });
  return response.data;
};

export const sendMessageOnConnection = async (payload) => {
  const response = await authApi({
    method: "post",
    url: ENDPOINTS.send_message_on_connection,
    data: payload,
  });
  return response.data;
};
