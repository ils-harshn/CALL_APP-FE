import useTabState from "../../../store/tabstate";
import AllT from "./AllT";
import ContactT from "./ContactT";
import DirectT from "./DirectT";
import GroupT from "./GroupT";
import IncomingT from "./IncomingT";
import MissedT from "./MissedT";
import OutgoingT from "./OutgoingT";

const HandleChatTab = () => {
  const secondTab0 = useTabState((state) => state.secondTab0);

  switch (secondTab0) {
    case 0:
      // DIRECT CHAT TAB
      return <DirectT />;
    case 1:
      // GROUP CHAT TAB
      return <GroupT />;
    default:
      return null;
  }
};

const HandleCallTab = () => {
  const secondTab1 = useTabState((state) => state.secondTab1);
  switch (secondTab1) {
    case 0:
      // ALL CALL TAB
      return <AllT />;
    case 1:
      // INCOMING CALL TAB
      return <IncomingT />;
    case 2:
      // OUTGOING CALL TAB
      return <OutgoingT />;
    case 3:
      // MISSED CALL TAB
      return <MissedT />;
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
      return <ContactT />;
    default:
      return null;
  }
};

const CallpasserRight = () => {
  return (
    <div className="w-[calc(100vw-36rem)] h-screen">
      <Tab />
    </div>
  );
};

export default CallpasserRight;
