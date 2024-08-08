import Main from "../layouts/main";
import { CheckLogin } from "../layouts/protectors";
import Callpasser from "./Callpasser";

const Home = () => {
  return (
    <CheckLogin>
      <Main docmeta={{ title: "Dashboard - SpeakEasy" }}>
        <Callpasser />
      </Main>
    </CheckLogin>
  );
};

export default Home;
