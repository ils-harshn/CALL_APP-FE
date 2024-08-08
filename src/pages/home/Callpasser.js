import { LuSearch } from "react-icons/lu";
import { IconButton } from "../../components/Buttons";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CPLSearchInput = ({ toggleOpenSearch }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <motion.div
      className="absolute top-0 left-0 border w-full h-full bg-white rounded-md flex px-4"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="h-full flex justify-center items-center text-xl">
        <LuSearch className="cursor-pointer" />
      </div>
      <div className="flex-grow mx-2">
        <input
          ref={inputRef}
          className="h-full w-full focus:outline-none"
          placeholder="Search by username"
        />
      </div>
      <div className="h-full flex justify-center items-center text-xl">
        <IoClose
          className="cursor-pointer hover:text-red-500"
          onClick={() => toggleOpenSearch(false)}
        />
      </div>
    </motion.div>
  );
};

const CPLSearch = () => {
  const [openSearch, toggleOpenSearch] = useState(true);

  return (
    <div className="flex justify-between items-center relative">
      <AnimatePresence>
        {openSearch && <CPLSearchInput toggleOpenSearch={toggleOpenSearch} />}
      </AnimatePresence>
      <div>
        <h4 className="text-2xl font-bold text-slate-700">SpeakEasy</h4>
        <p className="text-slate-700">Start New Conversation</p>
      </div>
      <div>
        <IconButton onClick={() => toggleOpenSearch(true)}>
          <LuSearch />
        </IconButton>
      </div>
    </div>
  );
};

const CallpasserLeft = () => {
  return (
    <div className="w-96 h-full border-r">
      <div className="px-10 pt-10">
        <CPLSearch />
      </div>
    </div>
  );
};

const Callpasser = () => {
  return (
    <div className="flex-grow">
      <CallpasserLeft />
    </div>
  );
};

export default Callpasser;
