import { useProfile } from "../../apis/auth/queryHooks";

const Protected = ({ children }) => {
  const { isLoading, isError } = useProfile();

  if (isLoading) return <h2>Loading</h2>;
  if (isError) return <h2>Login reqruired</h2>;
  return children;
};

const Home = () => {
  return (
    <Protected>
      <h2>welcome!</h2>
    </Protected>
  );
};

export default Home;
