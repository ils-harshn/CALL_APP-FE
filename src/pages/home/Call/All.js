import { useState } from "react";
import CallTabBox from "./CallTabBox";
import data from "./data";

const All = () => {
  const [active, setActive] = useState(null);
  return (
    <div className="mt-4">
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
