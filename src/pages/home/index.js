import Main from "../layouts/main";
import { CheckLogin } from "../layouts/protectors";

const Home = () => {
  return (
    <CheckLogin>
      <Main>
        <div className="flex-grow">
          <h2>Wow</h2>
        </div>
      </Main>
    </CheckLogin>
  );
};

export default Home;
