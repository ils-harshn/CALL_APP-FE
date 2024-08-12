import { IoCall } from "react-icons/io5";
import { CALL_STATUS } from "../data";
import {
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOutgoing,
} from "react-icons/fi";

const CallStatusDetail = ({ log }) => {
  return (
    <div className="w-full text-ellipsis overflow-hidden whitespace-nowrap flex items-center">
      <span className="mr-1">
        {log.status === CALL_STATUS.INCOMING ? (
          <FiPhoneIncoming className="text-xs text-green-500" />
        ) : log.status === CALL_STATUS.OUTGOING ? (
          <FiPhoneOutgoing className="text-xs text-yellow-500" />
        ) : log.status === CALL_STATUS.MISSED ? (
          <FiPhoneMissed className="text-xs text-red-500" />
        ) : null}
      </span>
      <span
        className={`text-xs ${
          log.status === CALL_STATUS.INCOMING
            ? "text-green-500"
            : log.status === CALL_STATUS.OUTGOING
            ? "text-yellow-500"
            : log.status === CALL_STATUS.MISSED
            ? "text-red-500"
            : ""
        }`}
      >
        {log.date_time}
      </span>
    </div>
  );
};

const CallTabBox = ({ data, setActive, isActive = false }) => {
  return (
    <div
      onClick={setActive}
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        isActive ? "bg-blue-50 border-l-blue-500" : "border-l-transparent"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative">
        {data.name[0].toUpperCase()}
      </div>

      <div className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.name}
        </h4>
        <CallStatusDetail log={data.last_call} />
      </div>

      <div className="flex items-center">
        <div className="bg-green-100 text-green-400 p-2 rounded-full duration-300 hover:bg-green-200 hover:text-green-500">
          <IoCall />
        </div>
      </div>
    </div>
  );
};

export default CallTabBox;
