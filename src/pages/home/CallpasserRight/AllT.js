import useTabState from "../../../store/tabstate";
import ContactDetails from "../ContactDetails/ContactDetails";
import NoSelectionT from "./NoSelectionT";

const AllT = () => {
  const selection = useTabState((state) => state.cAllSelection);

  if (selection) {
    return <ContactDetails data={selection} />;
  } else return <NoSelectionT />;
};

export default AllT;
