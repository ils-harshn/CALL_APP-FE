import React, { useState } from "react";
import { IconButtonSecondary } from "../../../components/Buttons";
import { BsChatLeftFill } from "react-icons/bs";
import { IoCall, IoInformationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import { motion } from "framer-motion";
import { CALL_STATUS } from "../Call/data";
import {
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOutgoing,
} from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ContactCard = ({ data }) => {
  return (
    <div className="bg-white w-full px-4 py-8 rounded-2xl">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex-shrink-0 flex justify-center items-center text-2xl relative">
          {data.name[0].toUpperCase()}
        </div>
        <div className="text-lg font-semibold mt-2">{data.name}</div>
        <div className="text-xs">{data.phone}</div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="mt-4 flex items-center w-fit">
          <div className="flex flex-col items-center">
            <IconButtonSecondary
              title="Chat"
              className="text-lg bg-yellow-100 text-yellow-500 hover:bg-yellow-200 duration-300"
            >
              <BsChatLeftFill />
            </IconButtonSecondary>
          </div>

          <div className="flex flex-col items-center ml-8">
            <IconButtonSecondary
              title="Call"
              className="text-lg bg-green-100 text-green-500 hover:bg-green-200 duration-300"
            >
              <IoCall />
            </IconButtonSecondary>
          </div>

          <div className="flex flex-col items-center ml-8">
            <IconButtonSecondary
              title="Info"
              className="text-lg bg-orange-100 text-orange-500 hover:bg-orange-200 duration-300"
            >
              <IoInformationOutline />
            </IconButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
};

const SharedFilesList = () => {
  const files = [
    { id: 1, filename: "mountainDeo.pdf" },
    { id: 2, filename: "hello.txt" },
    { id: 3, filename: "modern warfare III.exe" },
    { id: 4, filename: "windows 12.iso" },
    { id: 5, filename: "ios.exe" },
  ];

  return (
    <ul className="mt-1 cursor-pointer">
      {files.map((file) => (
        <li className="flex items-center text-blue-400" key={file.id}>
          <div className="mr-2">
            <CiFileOn />
          </div>
          <div className="flex-grow text-ellipsis overflow-hidden whitespace-nowrap">
            {file.filename}
          </div>
        </li>
      ))}
    </ul>
  );
};

const SharedFileCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white w-full px-6 py-6 rounded-2xl mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-semibold">Shared Document</div>
          <div className="bg-green-400 ml-1 p-1 rounded-md text-white font-bold text-xs">
            3
          </div>
        </div>
        <IconButtonSecondary
          onClick={toggleOpen}
          className="cursor-pointer bg-blue-100 text-blue-500 hover:bg-blue-200"
        >
          <IoIosArrowDown
            className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </IconButtonSecondary>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <SharedFilesList />
      </motion.div>
    </div>
  );
};

const Log = ({ data }) => {
  return (
    <li
      className={`flex items-center justify-between bg-white mb-4 px-4 py-4 rounded-xl cursor-pointer font-semibold hover:bg-slate-50 duration-300 ${
        data.status === CALL_STATUS.INCOMING
          ? "text-green-500"
          : data.status === CALL_STATUS.OUTGOING
          ? "text-yellow-500"
          : data.status === CALL_STATUS.MISSED
          ? "text-red-500"
          : ""
      }`}
    >
      <div className="flex items-center">
        {data.status === CALL_STATUS.INCOMING ? (
          <>
            <div className="mr-4">
              <FiPhoneIncoming />
            </div>
            <div>Incoming Call</div>
          </>
        ) : data.status === CALL_STATUS.OUTGOING ? (
          <>
            <div className="mr-4">
              <FiPhoneOutgoing />
            </div>
            <div>Outgoing Call</div>
          </>
        ) : data.status === CALL_STATUS.MISSED ? (
          <>
            <div className="mr-4">
              <FiPhoneMissed />
            </div>
            <div>Missed Call</div>
          </>
        ) : null}
      </div>
      <div className="text-xs">{data.time}</div>
    </li>
  );
};

const CallLogs = () => {
  const logs = [
    {
      id: 1,
      status: CALL_STATUS.INCOMING,
      time: "15 minutes ago",
    },
    {
      id: 2,
      status: CALL_STATUS.MISSED,
      time: "23 minutes ago",
    },
    {
      id: 3,
      status: CALL_STATUS.OUTGOING,
      time: "23 minutes ago",
    },
    {
      id: 4,
      status: CALL_STATUS.OUTGOING,
      time: "Yesterday 05:10 PM",
    },
    {
      id: 5,
      status: CALL_STATUS.INCOMING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 6,
      status: CALL_STATUS.MISSED,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 7,
      status: CALL_STATUS.MISSED,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 8,
      status: CALL_STATUS.INCOMING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 9,
      status: CALL_STATUS.OUTGOING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 10,
      status: CALL_STATUS.MISSED,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 11,
      status: CALL_STATUS.INCOMING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 12,
      status: CALL_STATUS.OUTGOING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 13,
      status: CALL_STATUS.INCOMING,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 14,
      status: CALL_STATUS.MISSED,
      time: "24-12-2023 01:10 AM",
    },
    {
      id: 15,
      status: CALL_STATUS.INCOMING,
      time: "24-12-2023 01:10 AM",
    },
  ];

  return (
    <div className="w-full px-4 rounded-2xl h-96 overflow-y-auto">
      <ul>
        {logs.map((log) => (
          <Log key={log.id} data={log} />
        ))}
      </ul>
    </div>
  );
};

const Delete = ({ className = "", ...props }) => {
  return (
    <div
      className={`w-full bg-white mt-4 rounded-lg py-4 text-red-500 font-semibold flex justify-center cursor-pointer hover:bg-slate-50 ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center">
        <MdDelete className="text-2xl mb-1" />
        <div>Delete Call Log</div>
      </div>
    </div>
  );
};

const ContactLogDetails = ({ data }) => {
  return (
    <motion.div
      key={data.id}
      initial={{ x: "-5%", opacity: 0 }} // Start off-screen to the left
      animate={{ x: 0, opacity: 1 }} // Slide to its natural position
      transition={{ type: "spring", stiffness: 100, damping: 20 }} // Customize the animation
      className="flex p-10"
    >
      <div className="min-w-80 w-[40%]">
        <ContactCard data={data} />
        <SharedFileCard />
      </div>
      <div className="flex-grow ml-4">
        <CallLogs />
        <div className="px-4">
          <Delete />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactLogDetails;
