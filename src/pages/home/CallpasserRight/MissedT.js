import useTabState from "../../../store/tabstate";
import ContactDetails from "../ContactDetails/ContactDetails";
import NoSelectionT from "./NoSelectionT";

const MissedT = () => {
  const selection = useTabState((state) => state.cMisSelection);

  if (selection) {
    return <ContactDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default MissedT;
