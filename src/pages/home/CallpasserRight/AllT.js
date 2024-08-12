import useTabState from "../../../store/tabstate";

const AllT = () => {
  const selection = useTabState((state) => state.cAllSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default AllT;
