import useTabState from "../../../store/tabstate";

const GroupT = () => {
  const selection = useTabState((state) => state.gtSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default GroupT;
