import useTabState from "../../../store/tabstate";
import ContactDetails from "../ContactDetails/ContactDetails";
import NoSelectionT from "./NoSelectionT";

const ContactT = () => {
  const selection = useTabState((state) => state.conTactselection);

  if (selection) {
    return <ContactDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default ContactT;
