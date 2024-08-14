import { AnimatePresence, motion } from "framer-motion";
import { IoAddOutline, IoClose, IoSearch } from "react-icons/io5";
import { IconButtonSecondary } from "../../../components/Buttons";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";

const SearchFriends = ({ closeTab }) => {
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
          onClick={closeTab}
          className="text-lg bg-slate-400 text-white hover:bg-slate-500 duration-300"
        >
          <IoClose />
        </IconButtonSecondary>
      </div>
    </motion.div>
  );
};

const AddFriendButton = () => {
  const isOpen = useSubTabState((state) => state.tab);
  const changeTab = useSubTabState((state) => state.changeTab);

  const openTab = () => changeTab(SUB_TABS.ADD_FRIEND);
  const closeTab = () => changeTab(null);

  return (
    <>
      <div className="absolute bottom-6 right-6">
        <IconButtonSecondary
          className="text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300"
          onClick={openTab}
        >
          <IoAddOutline />
        </IconButtonSecondary>
      </div>
      <AnimatePresence>
        {isOpen === SUB_TABS.ADD_FRIEND && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchFriends closeTab={closeTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddFriendButton;
