import useTabState from "../../../store/tabstate";
import ContactLogDetails from "../ContactLogDetails/ContactLogDetails";
import NoSelectionT from "./NoSelectionT";

const IncomingT = () => {
  const selection = useTabState((state) => state.cIncSelection);

  if (selection) {
    return <ContactLogDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default IncomingT;
