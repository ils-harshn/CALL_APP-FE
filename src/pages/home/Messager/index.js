import { motion } from "framer-motion";

import { IoAddOutline, IoCall, IoMicOutline, IoSearch } from "react-icons/io5";
import { IconButton, IconButtonSecondary } from "../../../components/Buttons";
import { status, status_color } from "../Chat/DirectTab";
import { HiVolumeUp } from "react-icons/hi";
import { CiMenuKebab } from "react-icons/ci";
import { LuSticker } from "react-icons/lu";
import { MdEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import {
  useGetMessagesOnConnection,
  useSendMessageOnConnection,
} from "../../../apis/messages/queryHooks";
import { useState } from "react";
import { userStatusStore } from "../../../store/userStatusStore";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.5 } },
};

const Status = ({ data }) => {
  const user_status = userStatusStore((state) => state?.[data.user._id]);

  return (
    <div
      className={`absolute w-4 h-4 top-[-2px] right-[-2px] rounded-full border-2 border-white ${
        status_color[user_status ? status.ONLINE : status.OFFLINE]
      }`}
    ></div>
  );
};

const StatusBar = ({ data }) => {
  return (
    <motion.div
      key={data.user._id}
      className="bg-white flex items-center h-20 px-8 py-4 border-b m-4 rounded-full shadow-sm"
      initial="hidden"
      animate="visible"
      variants={dropIn}
    >
      <div
        className={`${data.user.full_name[0].toUpperCase()} w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative`}
      >
        <Status data={data} />
        {data.user.full_name[0].toUpperCase()}
      </div>

      <div className="ml-2 w-36">
        <p className="truncate font-semibold">{data.user.full_name}</p>
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
  const [content, setContent] = useState("");

  const { mutate } = useSendMessageOnConnection({});

  const sendMessage = () => {
    mutate({
      connection_id: data._id,
      content: content,
    });
  };

  return (
    <div className="bg-white flex items-start h-fit px-8 py-4 border-t">
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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your message..."
          className={`text-lg focus:outline-none w-full input-${data.user._id} no-scrollbar`}
        />
      </div>
      <div className="flex items-center">
        <IconButtonSecondary className="text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
          <IoMicOutline />
        </IconButtonSecondary>
        <IconButtonSecondary
          className="ml-2 text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300"
          onClick={sendMessage}
        >
          <IoIosSend />
        </IconButtonSecondary>
      </div>
    </div>
  );
};

const MessageLists = ({ data }) => {
  const {
    data: messages = [],
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
    // isLoading,
  } = useGetMessagesOnConnection(
    {
      on: data._id,
    },
    {
      select: (data) => {
        return data.pages.flat();
      },
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <div className={`message-list-${data.user._id} flex-grow overflow-y-auto`}>
      {messages.length}
    </div>
  );
};

const Messager = ({ data }) => {
  return (
    <div className="messager flex flex-col h-screen">
      <StatusBar data={data} />
      <MessageLists data={data} />
      <MessageInput data={data} />
    </div>
  );
};

export default Messager;
