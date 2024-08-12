import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const GroupT = () => {
  const selection = useTabState((state) => state.gtSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default GroupT;
