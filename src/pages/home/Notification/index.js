import { IoClose, IoNotifications } from "react-icons/io5";
import { IconButton, IconButtonSecondary } from "../../../components/Buttons";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Dot = () => {
  return (
    <motion.div
      className="bg-red-500 w-2 h-2 rounded-full absolute top-0 right-0"
      animate={{
        scale: [0.75, 1, 0.75],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
        repeat: Infinity,
      }}
    />
  );
};

const NotificationButton = () => {
  const isOpen = useSubTabState((state) => state.tab);
  const changeTab = useSubTabState((state) => state.changeTab);

  const toggleTab = () =>
    changeTab(
      SUB_TABS.NOTIFICATIONS === isOpen ? null : SUB_TABS.NOTIFICATIONS
    );

  return (
    <IconButton
      className="relative"
      onClick={toggleTab}
      isActive={SUB_TABS.NOTIFICATIONS === isOpen}
    >
      <Dot />
      <IoNotifications />
    </IconButton>
  );
};

const List = ({ closeTab }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-10 pt-10 flex items-center justify-between border-b pb-5">
        <div>
          <h4 className="text-2xl font-bold text-slate-700">Notification</h4>
          <p className="text-slate-700">List of notification</p>
        </div>
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

export const Notifications = () => {
  const isOpen = useSubTabState((state) => state.tab);
  const changeTab = useSubTabState((state) => state.changeTab);

  const closeTab = () => changeTab(null);

  return (
    <AnimatePresence>
      {isOpen === SUB_TABS.NOTIFICATIONS && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <List closeTab={closeTab} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationButton;
