import useTabState from "../../../store/tabstate";
import ContactDetails from "../ContactDetails/ContactDetails";
import NoSelectionT from "./NoSelectionT";

const IncomingT = () => {
  const selection = useTabState((state) => state.cIncSelection);

  if (selection) {
    return <ContactDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default IncomingT;
