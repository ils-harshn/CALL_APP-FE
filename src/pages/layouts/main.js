import { useEffect } from "react";
import useSocketStore from "../../store/socketStateStore";
import docmetadata from "../../utils/docmetadata";
import AppList from "./applist";
import SideBar from "./sidebar";
import SOCKET_EVENTS from "../../apis/socket/events";
import { useQueryClient } from "react-query";
import QUERY_KEYS from "../../apis/queryKeys";

const SocketDataEventsListener = () => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewConnection = (newConnection) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_ACCEPTED_CONNECTIONS],
        (oldData) => {
          if (!oldData) return oldData;
          const newPages = oldData.pages.map((page, pageIndex) => {
            const filtered_page = page.filter(
              (conn) => conn !== newConnection._id
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

    socket.on(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
    return () => {
      socket.off(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
    };
  }, [socket, queryClient]);

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
