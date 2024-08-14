import useTabState from "../../../store/tabstate";
import Messager from "../Messager";
import NoSelectionT from "./NoSelectionT";

const DirectT = () => {
  const selection = useTabState((state) => state.dTSelection);

  if (selection) {
    return <Messager data={selection} />;
  } else return <NoSelectionT />;
};

export default DirectT;
