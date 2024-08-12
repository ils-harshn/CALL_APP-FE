import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const DirectT = () => {
  const selection = useTabState((state) => state.dTSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default DirectT;
