import docmetadata from "../../utils/docmetadata";
import AppList from "./applist";
import SideBar from "./sidebar";

const Main = ({ children, docmeta }) => {
  docmetadata(docmeta);

  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      {children}
      <AppList />
    </div>
  );
};

export default Main;
