import useTabState from "../../../store/tabstate";

const OutgoingT = () => {
  const selection = useTabState((state) => state.cOutSelection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default OutgoingT;
