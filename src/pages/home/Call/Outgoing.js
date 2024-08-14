import CallTabBox from "./CallTabBox";
import data, { CALL_STATUS } from "./data";
import useTabState from "../../../store/tabstate";

const Outgoing = () => {
  const active = useTabState((state) => state.cOutSelection);
  const setActive = useTabState((state) => state.changeCOutSelection);
  return (
    <div className="mt-4 h-[calc(100vh-244px)] overflow-y-auto pb-16">
      {data
        .filter((call) => call.last_call.status === CALL_STATUS.OUTGOING)
        .map((call) => (
          <CallTabBox
            key={call.id}
            data={call}
            isActive={active?.id === call.id}
            setActive={() => setActive(call)}
          />
        ))}
    </div>
  );
};

export default Outgoing;
