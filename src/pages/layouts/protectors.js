import { Navigate } from "react-router-dom";
import { useProfile } from "../../apis/auth/queryHooks";
import { FullScreenSpinner } from "../../components/Loaders/FullScreenLoaders";
import ROUTES from "../../routes";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SOCKET_EVENTS from "../../apis/socket/events";
import useSocketStore from "../../store/socketStateStore";

const SOCKET_CONNECTING_STATES = {
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  FAILED: "FAILED",
};

export const CheckLogin = ({ children }) => {
  const set_socket = useSocketStore((state) => state.set_socket);
  const { isLoading, isError } = useProfile();
  const [socketState, setSocketState] = useState(
    SOCKET_CONNECTING_STATES.CONNECTING
  );

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URI, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    const handleConnect = () => {
      setSocketState(SOCKET_CONNECTING_STATES.CONNECTED);
      set_socket(socket);
    };

    const handleError = () => {
      setSocketState(SOCKET_CONNECTING_STATES.FAILED);
    };

    socket.on(SOCKET_EVENTS.CONNECTED, handleConnect);
    socket.on(SOCKET_EVENTS.CONNECT_ERROR, handleError);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECTED, handleConnect);
      socket.on(SOCKET_EVENTS.CONNECT_ERROR, handleError);
    };
  }, [set_socket]);

  if (isLoading || socketState === SOCKET_CONNECTING_STATES.CONNECTING)
    return <FullScreenSpinner />;
  if (isError || socketState === SOCKET_CONNECTING_STATES.FAILED)
    return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
