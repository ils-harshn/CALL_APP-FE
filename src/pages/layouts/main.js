import { useEffect } from "react";
import useSocketStore from "../../store/socketStateStore";
import docmetadata from "../../utils/docmetadata";
import AppList from "./applist";
import SideBar from "./sidebar";
import SOCKET_EVENTS from "../../apis/socket/events";

const SocketDataEventsListener = () => {
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    const handleNewConnection = (msg) => {
      console.log(msg);
    };

    socket.on(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
    return () => {
      socket.off(SOCKET_EVENTS.NEW_CONNECTION_ADDED, handleNewConnection);
    };
  }, [socket]);

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
