import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoAddOutline, IoClose, IoSearch } from "react-icons/io5";
import { IconButtonSecondary } from "../../../components/Buttons";

const SearchFriends = ({ toggleOpen }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto px-10 pt-10"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center border-b pb-2">
        <IoSearch />
        <input
          placeholder="Search by Username or Email"
          className="flex-grow px-2 py-2 focus:outline-none"
        ></input>
        <IconButtonSecondary
          onClick={() => toggleOpen(false)}
          className="text-lg bg-slate-400 text-white hover:bg-slate-500 duration-300"
        >
          <IoClose />
        </IconButtonSecondary>
      </div>
    </motion.div>
  );
};

const AddFriendButton = () => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <>
      <div className="absolute bottom-6 right-6">
        <IconButtonSecondary
          className="text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300"
          onClick={() => toggleOpen(true)}
        >
          <IoAddOutline />
        </IconButtonSecondary>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchFriends toggleOpen={toggleOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddFriendButton;
