import AppList from "./applist";
import SideBar from "./sidebar";

const Main = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      {children}
      <AppList />
    </div>
  );
};

export default Main;
