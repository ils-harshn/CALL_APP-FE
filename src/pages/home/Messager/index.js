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
import { useCallback, useEffect, useRef, useState } from "react";
import { userStatusStore } from "../../../store/userStatusStore";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from "react-virtualized";
import { useProfile } from "../../../apis/auth/queryHooks";
import { MessageDateTimeFormatter } from "../../../utils/dateFormaters";

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
  const textareaRef = useRef();
  const submitBtnRef = useRef();

  const { mutate } = useSendMessageOnConnection({});

  const sendMessage = (e) => {
    e.preventDefault();
    mutate({
      connection_id: data._id,
      content: content,
    });

    setContent("");
  };

  useEffect(() => {
    function calcHeight(value) {
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      let newHeight = 16 + 12 + 2 + numberOfLineBreaks * (16 + 12);
      return newHeight;
    }

    const handleKeyUp = () => {
      if (textareaRef.current) {
        const maxHeight = window.innerHeight * 0.4;
        const newHeight = calcHeight(textareaRef.current.value);
        textareaRef.current.style.height = `${Math.min(
          newHeight,
          maxHeight
        )}px`;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          return;
        }
        e.preventDefault();
        submitBtnRef?.current.click();
      }
    };

    const textareaElement = textareaRef.current;

    if (textareaElement) {
      handleKeyUp();
      textareaElement.addEventListener("keyup", handleKeyUp);
      textareaElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener("keyup", handleKeyUp);
        textareaElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return (
    <form onSubmit={sendMessage}>
      <div className="bg-white flex items-end h-min-20 px-8 py-4 border-t">
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
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your message..."
            className={`text-lg focus:outline-none w-full input-${data.user._id} resize-none no-scrollbar`}
          />
        </div>
        <div className="flex items-center">
          <IconButtonSecondary className="text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300">
            <IoMicOutline />
          </IconButtonSecondary>
          <IconButtonSecondary
            nref={submitBtnRef}
            type="submit"
            className="ml-2 text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300"
          >
            <IoIosSend />
          </IconButtonSecondary>
        </div>
      </div>
    </form>
  );
};

const Message = ({ data, withUser }) => {
  const { data: user } = useProfile();
  const isSender = user._id === data.sender;

  if (data.type === "system") {
    return (
      <div className="flex justify-center my-2">
        <div className="px-4 py-1 bg-amber-300 rounded-full text-xs italic font-bold">
          {data.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`my-2 w-full h-full flex flex-col text-sm ${
        isSender ? "items-end" : "items-start"
      }`}
    >
      {isSender ? (
        <div className="mr-5">
          <span className="font-semibold">You</span>
          <span className="ml-2 text-xs">
            {MessageDateTimeFormatter(data.updatedAt)}
          </span>
        </div>
      ) : (
        <div className="ml-5">
          <span className="font-semibold">{withUser.full_name}</span>
          <span className="ml-2 text-xs">
            {MessageDateTimeFormatter(data.updatedAt)}
          </span>
        </div>
      )}
      <div
        className={`max-w-[60%] text-wrap break-words rounded-3xl px-8 py-4 font-semibold cursor-pointer ${
          isSender
            ? "mr-4 text-black bg-slate-200 hover:bg-blue-100 rounded-tr-none"
            : "ml-4 text-white bg-blue-500 hover:bg-blue-400 rounded-tl-none"
        }`}
      >
        {data.content}
      </div>
    </div>
  );
};

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50,
});

const MessageLists = ({ on }) => {
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMessagesOnConnection(
    {
      on: on._id,
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

  const isRowLoaded = useCallback(
    ({ index }) => {
      return !!data[index];
    },
    [data]
  );

  const loadMoreRows = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      return fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener("resize", () => cache.clearAll());
    return () => {
      window.removeEventListener("resize", () => cache.clearAll());
    };
  }, []);

  if (isLoading)
    return (
      <div className="mt-4 flex-grow">
        <div>Loading History...</div>
      </div>
    );

  if (isLoading === false && data?.length === 0)
    return (
      <div className="mt-4 p-4 text-center">
        No results found.
        <br />
        Try adjusting your search criteria.
      </div>
    );

  return (
    <div className="mt-4 flex-grow">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={data.length + (hasNextPage ? 2 : 0)} // Adjust row count
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                height={height}
                width={width}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                rowCount={data.length + (isFetchingNextPage ? 2 : 0)} // Adjust row count
                rowRenderer={({ index, key, parent, style }) => {
                  if (isFetchingNextPage && index >= data.length) {
                    return (
                      <div key={key} style={style}>
                        <div>Loading History...</div>
                      </div>
                    );
                  }

                  const message = data[index];
                  if (!message) return null;
                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache}
                      parent={parent}
                      columnIndex={0}
                      rowIndex={index}
                    >
                      {({ registerChild }) => (
                        <div ref={registerChild} style={style}>
                          <Message data={message} withUser={on.user} />
                        </div>
                      )}
                    </CellMeasurer>
                  );
                }}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

// const MessageLists = ({ on }) => {
//   const {
//     data: messages = [],
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//   } = useGetMessagesOnConnection(
//     {
//       on: on._id,
//     },
//     {
//       select: (data) => {
//         return data.pages.flat().reverse();
//       },
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       staleTime: Infinity,
//       cacheTime: Infinity,
//     }
//   );

//   const listRef = useRef(null);

//   const handleScroll = ({ scrollTop }) => {
//     if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   };

//   const rowRenderer = ({ index, key, parent, style }) => {
//     const message = messages[index];

//     return (
//       <CellMeasurer
//         key={key}
//         cache={cache}
//         parent={parent}
//         columnIndex={0}
//         rowIndex={index}
//       >
//         {({ registerChild }) => (
//           <div ref={registerChild} style={style}>
//             <Message data={message} withUser={on.user} />
//           </div>
//         )}
//       </CellMeasurer>
//     );
//   };

//   useEffect(() => {
//     if (
//       !isFetchingNextPage &&
//       messages.length &&
//       hasNextPage &&
//       listRef.current
//     ) {
//       listRef.current.scrollToRow(
//         messages.length > 10 ? 10 : messages.length - 1
//       );
//     }
//   }, [isLoading, isFetchingNextPage, messages.length, hasNextPage]);

//   useEffect(() => {
//     window.addEventListener("resize", () => cache.clearAll());
//     return () => {
//       window.removeEventListener("resize", () => cache.clearAll());
//     };
//   }, []);

//   useEffect(() => {
//     cache.clearAll();
//   }, [messages.length]);

//   return (
//     <div className="flex-grow">
//       <AutoSizer>
//         {({ height, width }) => (
//           <List
//             ref={listRef}
//             width={width}
//             height={height}
//             rowCount={messages.length}
//             rowHeight={cache.rowHeight}
//             deferredMeasurementCache={cache}
//             rowRenderer={rowRenderer}
//             onScroll={handleScroll}
//             scrollToAlignment="end"
//             overscanRowCount={5}
//           />
//         )}
//       </AutoSizer>
//     </div>
//   );
// };

const Messager = ({ data }) => {
  return (
    <div className="messager flex flex-col h-screen">
      <StatusBar data={data} />
      <MessageLists on={data} />
      <MessageInput data={data} />
    </div>
  );
};

export default Messager;
