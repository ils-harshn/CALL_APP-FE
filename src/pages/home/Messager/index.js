import { motion } from "framer-motion";

import { IoAddOutline, IoCall, IoMicOutline, IoSearch } from "react-icons/io5";
import { IconButton, IconButtonSecondary } from "../../../components/Buttons";
import { status_color } from "../Chat/DirectTab";
import { HiVolumeUp } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";
import { LuSticker } from "react-icons/lu";
import { MdEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.5 } },
};

const StatusBar = ({ data }) => {
  return (
    <motion.div
      key={data.id}
      className="bg-white flex items-center h-20 px-8 py-4 border-b m-4 rounded-full shadow-sm"
      initial="hidden"
      animate="visible"
      variants={dropIn}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative">
        <div
          className={`absolute w-4 h-4 top-[-2px] right-[-2px] rounded-full border-2 border-white ${
            status_color[data.status]
          }`}
        ></div>
        {data.name[0].toUpperCase()}
      </div>

      <div className="ml-2 w-36">
        <p className="truncate font-semibold">{data.name}</p>
      </div>

      <div className="mx-4 h-[60%] border-r"></div>

      <div className="flex-grow flex justify-between">
        <div className="flex items-center">
          <IconButton>
            <HiVolumeUp />
          </IconButton>
          <IconButton className="ml-2">
            <IoSearch />
          </IconButton>
        </div>

        <div className="flex items-center">
          <IconButton>
            <IoCall />
          </IconButton>
          <IconButton className="ml-2">
            <CiMenuKebab />
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
};

const MessageInput = ({ data }) => {
  return (
    <div className="bg-white flex items-center h-20 px-8 py-4 border-t">
      <div className="flex items-center">
        <IconButtonSecondary className="text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
          <LuSticker />
        </IconButtonSecondary>
        <IconButtonSecondary className="ml-2 text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
          <MdEmojiEmotions />
        </IconButtonSecondary>
        <IconButtonSecondary className="ml-2 text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
          <IoAddOutline />
        </IconButtonSecondary>
      </div>
      <div className="flex-grow px-8">
        <input
          placeholder="Write your message..."
          className={`text-lg focus:outline-none w-full input-${data.id}`}
        />
      </div>
      <div className="flex items-center">
        <IconButtonSecondary className="text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
          <IoMicOutline />
        </IconButtonSecondary>
        <IconButtonSecondary className="ml-2 text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300">
          <IoIosSend />
        </IconButtonSecondary>
      </div>
    </div>
  );
};

const MessageLists = ({ data }) => {
  return (
    <div
      className={`message-list-${data.id} h-[calc(100vh-12rem)] overflow-y-auto`}
    ></div>
  );
};

const Messager = ({ data }) => {
  return (
    <div className="messager">
      <StatusBar data={data} />
      <MessageLists data={data} />
      <MessageInput data={data} />
    </div>
  );
};

export default Messager;
