import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const OutgoingT = () => {
  const selection = useTabState((state) => state.cOutSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default OutgoingT;
