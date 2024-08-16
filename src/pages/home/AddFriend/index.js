import { AnimatePresence, motion } from "framer-motion";
import { IoAddOutline, IoClose, IoSearch } from "react-icons/io5";
import { IconButton, IconButtonSecondary } from "../../../components/Buttons";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";
import { dtdata } from "../Chat/DirectTab";

const Member = ({ data }) => {
  return (
    <div className="px-9 py-4 flex cursor-pointer border-l hover:bg-blue-50">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl">
        {data.name[0].toUpperCase()}
      </div>
      <div className="ml-4 flex-grow min-w-0 items-center py-2">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.name}
        </h4>
      </div>
      <div>
        <IconButton>
          <IoAddOutline />
        </IconButton>
      </div>
    </div>
  );
};

const List = () => {
  return (
    <div className="mt-4 h-[calc(100vh-108px)] overflow-y-auto">
      {dtdata.map((member) => (
        <Member key={member.id} data={member} />
      ))}
    </div>
  );
};

const SearchFriends = ({ closeTab }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-10 pt-10">
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
      </div>
      <List />
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
