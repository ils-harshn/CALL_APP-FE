import { Navigate } from "react-router-dom";
import { useProfile } from "../../apis/auth/queryHooks";
import { FullScreenSpinner } from "../../components/Loaders/FullScreenLoaders";
import ROUTES from "../../routes";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SOCKET_EVENTS from "../../apis/socket/events";

const SOCKET_CONNECTING_STATES = {
  CONNECTING: "CONNECTING",
  CONNECTED: "CONNECTED",
  FAILED: "FAILED",
};

export const CheckLogin = ({ children }) => {
  const { isLoading, isError } = useProfile();
  const [socketState, setSocketState] = useState(
    SOCKET_CONNECTING_STATES.CONNECTING
  );

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URI);

    const handleConnect = () => {
      setSocketState(SOCKET_CONNECTING_STATES.CONNECTED);
    };
    
    socket.on(SOCKET_EVENTS.CONNECTED, handleConnect);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECTED, handleConnect);
    };
  }, []);

  if (isLoading || socketState === SOCKET_CONNECTING_STATES.CONNECTING)
    return <FullScreenSpinner />;
  if (isError || socketState === SOCKET_CONNECTING_STATES.FAILED)
    return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
