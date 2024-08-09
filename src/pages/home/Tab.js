import useTabState from "../../store/tabstate";
import DirectTab from "./DirectTab";

const HandleChatTab = () => {
  const secondTab0 = useTabState((state) => state.secondTab0);
  if (secondTab0 === 0) return <DirectTab />;
  return null;
};

const HandleCallTab = () => {
  // const secondTab1 = useTabState((state) => state.secondTab1);
  return null;
};

const Tab = () => {
  const firstTab = useTabState((state) => state.firstTab);
  if (firstTab === 0) return <HandleChatTab />;
  else if (firstTab === 1) return <HandleCallTab />;
  else return null;
};

export default Tab;
