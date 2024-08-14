import React from "react";
import { IconButtonSecondary } from "../../../components/Buttons";
import { BsChatLeftFill } from "react-icons/bs";
import { IoCall, IoInformationOutline } from "react-icons/io5";
import { motion } from "framer-motion";
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

const Details = ({ data }) => {
  const details = [
    {
      label: "Name",
      value: data.name,
    },
    {
      label: "Gender",
      value: "male",
    },
    {
      label: "Birthday",
      value: "18 April 2002",
    },
    {
      label: "City",
      value: "Indore",
    },
    {
      label: "Mobile No",
      value: data.phone,
    },
    {
      label: "email",
      value: "example@gmail.com",
    },
  ];

  return (
    <div className="bg-white w-full p-8 rounded-2xl">
      <div className="text-lg font-semibold pb-2 mb-2 border-b-2">
        Contact Info
      </div>

      {details.map((item, index) => (
        <div
          className={`flex justify-between pt-3 text-sm ${
            index === details.length - 1 ? "" : "border-b pb-3"
          }`}
        >
          <div className="text-slate-500 font-semibold">{item.label}</div>
          <div className="text-slate-500">{item.value}</div>
        </div>
      ))}
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
        <div>Delete Contact</div>
      </div>
    </div>
  );
};

const ContactDetails = ({ data }) => {
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
        <Delete />
      </div>
      <div className="flex-grow ml-4">
        <Details data={data} />
      </div>
    </motion.div>
  );
};

export default ContactDetails;
