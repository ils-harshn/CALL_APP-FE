import useTabState from "../../../store/tabstate";

const MissedT = () => {
  const selection = useTabState((state) => state.cMisSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default MissedT;
