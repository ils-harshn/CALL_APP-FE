import useTabState from "../../../store/tabstate";
import ContactLogDetails from "../ContactLogDetails/ContactLogDetails";
import NoSelectionT from "./NoSelectionT";

const MissedT = () => {
  const selection = useTabState((state) => state.cMisSelection);

  if (selection) {
    return <ContactLogDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default MissedT;
