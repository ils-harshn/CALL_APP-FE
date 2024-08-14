import useTabState from "../../../store/tabstate";
import ContactLogDetails from "../ContactLogDetails/ContactLogDetails";
import NoSelectionT from "./NoSelectionT";

const AllT = () => {
  const selection = useTabState((state) => state.cAllSelection);

  if (selection) {
    return <ContactLogDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default AllT;
