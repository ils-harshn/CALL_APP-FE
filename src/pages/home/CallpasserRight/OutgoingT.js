import useTabState from "../../../store/tabstate";
import ContactDetails from "../ContactDetails/ContactDetails";
import NoSelectionT from "./NoSelectionT";

const OutgoingT = () => {
  const selection = useTabState((state) => state.cOutSelection);

  if (selection) {
    return <ContactDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default OutgoingT;
