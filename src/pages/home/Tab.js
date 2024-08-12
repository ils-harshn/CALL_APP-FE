import useTabState from "../../store/tabstate";
import All from "./Call/All";
import Incoming from "./Call/Incoming";
import Outgoing from "./Call/Outgoing";
import Missed from "./Call/Missed";
import DirectTab from "./Chat/DirectTab";
import GroupTab from "./Chat/GroupTab";
import Contact from "./Contact";

const HandleChatTab = () => {
  const secondTab0 = useTabState((state) => state.secondTab0);

  switch (secondTab0) {
    case 0:
      // DIRECT CHAT TAB
      return <DirectTab />;
    case 1:
      // GROUP CHAT TAB
      return <GroupTab />;
    default:
      return null;
  }
};

const HandleCallTab = () => {
  const secondTab1 = useTabState((state) => state.secondTab1);
  switch (secondTab1) {
    case 0:
      // ALL CALL TAB
      return <All />;
    case 1:
      // INCOMING CALL TAB
      return <Incoming />;
    case 2:
      // OUTGOING CALL TAB
      return <Outgoing />;
    case 3:
      // MISSED CALL TAB
      return <Missed />;
    default:
      return null;
  }
};

const Tab = () => {
  const firstTab = useTabState((state) => state.firstTab);

  switch (firstTab) {
    case 0:
      // CHAT TAB
      return <HandleChatTab />;
    case 1:
      // CALL TAB
      return <HandleCallTab />;
    case 2:
      // CONTACT TAB
      return <Contact />;
    default:
      return null;
  }
};

export default Tab;
