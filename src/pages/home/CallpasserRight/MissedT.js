import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const MissedT = () => {
  const selection = useTabState((state) => state.cMisSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default MissedT;
