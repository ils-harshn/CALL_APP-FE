import useTabState from "../../../store/tabstate";

const ContactT = () => {
  const selection = useTabState((state) => state.conTactselection);
  return <code>{selection ? JSON.stringify(selection) : ""}</code>;
};

export default ContactT;
