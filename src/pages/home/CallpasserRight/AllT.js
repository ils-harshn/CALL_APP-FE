import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const AllT = () => {
  const selection = useTabState((state) => state.cAllSelection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default AllT;
