import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const IncomingT = () => {
  const selection = useTabState((state) => state.cIncSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default IncomingT;
