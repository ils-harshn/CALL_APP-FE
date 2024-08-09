import { IoCall } from "react-icons/io5";
import { BadgeButton, BadgeIconButton } from "../../components/Buttons";
import { RiContactsFill } from "react-icons/ri";
import { BsChatLeftFill } from "react-icons/bs";
import {
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOutgoing,
} from "react-icons/fi";
import useTabState from "../../store/tabstate";
import { motion, AnimatePresence } from "framer-motion";

export const FirstTabsOptions = () => {
  const tabState = useTabState((state) => state.firstTab);
  const changeTab = useTabState((state) => state.changeFirstTab);

  return (
    <div className="mt-10 flex justify-between">
      <BadgeIconButton
        title="Chat"
        isActive={tabState === 0}
        onClick={() => changeTab(0)}
      >
        <BsChatLeftFill />
      </BadgeIconButton>

      <BadgeIconButton
        title="Call"
        isActive={tabState === 1}
        onClick={() => changeTab(1)}
      >
        <IoCall />
      </BadgeIconButton>

      <BadgeIconButton
        title="Contact"
        isActive={tabState === 2}
        onClick={() => changeTab(2)}
      >
        <RiContactsFill />
      </BadgeIconButton>
    </div>
  );
};

const SecondTab0 = ({ variants }) => {
  const tabstate = useTabState((state) => state.secondTab0);
  const changeTab = useTabState((state) => state.changeSecondTab0);

  return (
    <motion.div
      key="SecondTabsOptions_0"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
      className="mt-6 flex justify-between"
    >
      <BadgeButton
        className="flex-grow mr-6"
        isActive={tabstate === 0}
        onClick={() => changeTab(0)}
      >
        Direct
      </BadgeButton>
      <BadgeButton
        className="flex-grow"
        isActive={tabstate === 1}
        onClick={() => changeTab(1)}
      >
        Group
      </BadgeButton>
    </motion.div>
  );
};

const SecondTab1 = ({ variants }) => {
  const tabstate = useTabState((state) => state.secondTab1);
  const changeTab = useTabState((state) => state.changeSecondTab1);

  return (
    <motion.div
      key="SecondTabsOptions_1"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
      className="mt-6 flex justify-between"
    >
      <BadgeButton isActive={tabstate === 0} onClick={() => changeTab(0)}>
        All
      </BadgeButton>
      <BadgeButton isActive={tabstate === 1} onClick={() => changeTab(1)}>
        <FiPhoneIncoming />
      </BadgeButton>
      <BadgeButton isActive={tabstate === 2} onClick={() => changeTab(2)}>
        <FiPhoneOutgoing />
      </BadgeButton>
      <BadgeButton isActive={tabstate === 3} onClick={() => changeTab(3)}>
        <FiPhoneMissed />
      </BadgeButton>
    </motion.div>
  );
};

export const SecondTabsOptions = () => {
  const tabState = useTabState((state) => state.firstTab);

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (tabState === 2) return null;

  return (
    <AnimatePresence mode="wait">
      {tabState === 0 && <SecondTab0 variants={fadeVariants} />}
      {tabState === 1 && <SecondTab1 variants={fadeVariants} />}
    </AnimatePresence>
  );
};
