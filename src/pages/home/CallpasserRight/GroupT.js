import useTabState from "../../../store/tabstate";
import Messager from "../Messager";
import NoSelectionT from "./NoSelectionT";

const GroupT = () => {
  const selection = useTabState((state) => state.gtSelection);

  if (selection) {
    return <Messager data={selection} />;
  } else return <NoSelectionT />;
};

export default GroupT;
