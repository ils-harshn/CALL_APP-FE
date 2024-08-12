import useTabState from "../../../store/tabstate";

const IncomingT = () => {
  const selection = useTabState((state) => state.cIncSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default IncomingT;
