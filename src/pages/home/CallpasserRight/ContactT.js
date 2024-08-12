import useTabState from "../../../store/tabstate";
import NoSelectionT from "./NoSelectionT";

const ContactT = () => {
  const selection = useTabState((state) => state.conTactselection);
  return selection ? (
    <code>{JSON.stringify(selection)}</code>
  ) : (
    <NoSelectionT />
  );
};

export default ContactT;
