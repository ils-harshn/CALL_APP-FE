import { useProfile } from "../../apis/auth/queryHooks";
import { FullScreenSpinner } from "../../components/Loaders/FullScreenLoaders";

export const CheckLogin = ({ children }) => {
  const { isLoading, isError } = useProfile();

  if (isLoading) return <FullScreenSpinner />;
  if (isError) return <h2>Login reqruired</h2>;
  return children;
};
