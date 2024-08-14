import useTabState from "../../../store/tabstate";
import ContactLogDetails from "../ContactLogDetails/ContactLogDetails";
import NoSelectionT from "./NoSelectionT";

const OutgoingT = () => {
  const selection = useTabState((state) => state.cOutSelection);

  if (selection) {
    return <ContactLogDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default OutgoingT;
