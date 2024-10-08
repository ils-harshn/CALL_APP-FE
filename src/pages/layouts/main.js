import { useEffect } from "react";
import useSocketStore from "../../store/socketStateStore";
import docmetadata from "../../utils/docmetadata";
import AppList from "./applist";
import SideBar from "./sidebar";
import SOCKET_EVENTS from "../../apis/socket/events";
import { useQueryClient } from "react-query";
import QUERY_KEYS from "../../apis/queryKeys";
import { messagesSeenStatusStore } from "../../store/messagesSeenStatusStore";

const SocketDataEventsListener = () => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();
  const markMessageAsSeen = messagesSeenStatusStore((state) => state.cache);

  useEffect(() => {
    const handleNewConnection = (newConnection) => {
      const connectionMsgKey = [
        QUERY_KEYS.GET_MESSAGES_ON_CONNECTION,
        { on: newConnection._id },
      ];
      const existingMsgsData = queryClient.getQueryData(connectionMsgKey);
      const newmsg = {
        on: newConnection._id,
        ...newConnection.last_message,
      };
      if (existingMsgsData) {
        queryClient.setQueryData(connectionMsgKey, (oldData) => {
          return {
            ...oldData,
            pages: [[newmsg, ...oldData.pages[0]], ...oldData.pages.slice(1)],
          };
        });
      }

      queryClient.setQueryData(
        [QUERY_KEYS.GET_ACCEPTED_CONNECTIONS],
        (oldData) => {
          if (!oldData) return oldData;
          const newPages = oldData.pages.map((page, pageIndex) => {
            const filtered_page = page.filter(
              (conn) => conn._id !== newConnection._id
            );

            if (pageIndex === 0) {
              return [newConnection, ...filtered_page];
            }
            return filtered_page;
          });

          return {
            ...oldData,
            pages: newPages,
          };
        }
      );
    };

    const handleMarkedMessageAsSeen = (message) => {
      markMessageAsSeen({
        key: message._id,
        value: "seen",
      });
    };

    socket.on(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
    socket.on(SOCKET_EVENTS.MARKED_MESSAGE_AS_SEEN, handleMarkedMessageAsSeen);
    return () => {
      socket.off(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
      socket.off(
        SOCKET_EVENTS.MARKED_MESSAGE_AS_SEEN,
        handleMarkedMessageAsSeen
      );
    };
  }, [socket, queryClient, markMessageAsSeen]);

  return null;
};

const Main = ({ children, docmeta }) => {
  docmetadata(docmeta);

  return (
    <div className="flex w-screen h-screen">
      <SocketDataEventsListener />
      <SideBar />
      {children}
      <AppList />
    </div>
  );
};

export default Main;
