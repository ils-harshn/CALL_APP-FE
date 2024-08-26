import { Navigate } from "react-router-dom";
import { useProfile } from "../../apis/auth/queryHooks";
import { FullScreenSpinner } from "../../components/Loaders/FullScreenLoaders";
import ROUTES from "../../routes";

export const CheckLogin = ({ children }) => {
  const { isLoading, isError } = useProfile();

  if (isLoading) return <FullScreenSpinner />;
  if (isError) return <Navigate to={ROUTES.LOGIN} />;
  return children;
};
