import useTabState from "../../../store/tabstate";

const DirectT = () => {
  const selection = useTabState((state) => state.dTSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default DirectT;
