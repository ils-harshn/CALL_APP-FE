import CallTabBox from "./CallTabBox";
import data from "./data";
import useTabState from "../../../store/tabstate";

const All = () => {
  const active = useTabState((state) => state.cAllSelection);
  const setActive = useTabState((state) => state.changeCAllSelection);
  return (
    <div className="mt-4 h-[calc(100vh-244px)] overflow-y-auto">
      {data.map((call) => (
        <CallTabBox
          key={call.id}
          data={call}
          isActive={active === call.id}
          setActive={() => setActive(call.id)}
        />
      ))}
    </div>
  );
};

export default All;
