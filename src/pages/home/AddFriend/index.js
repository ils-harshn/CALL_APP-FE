import { AnimatePresence, motion } from "framer-motion";
import {
  IoAddOutline,
  IoCheckmarkDoneCircleOutline,
  IoClose,
  IoCloseSharp,
  IoSearch,
} from "react-icons/io5";
import { IconButtonSecondary, SMButton } from "../../../components/Buttons";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";
import { useState, useCallback, useEffect } from "react";
import { InfiniteLoader, List as VList, AutoSizer } from "react-virtualized";
import { useDebounce } from "use-debounce";
import {
  useRespondOnConnectionRequest,
  useSearchFriends,
  useSendConnectionRequest,
} from "../../../apis/addFriends/queryHooks";
import Skeleton from "react-loading-skeleton";
import { PiClockCountdownBold } from "react-icons/pi";
import { CgUnblock } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { useQueryClient } from "react-query";
import QUERY_KEYS from "../../../apis/queryKeys";
import { useProfile } from "../../../apis/auth/queryHooks";
import { MdDone } from "react-icons/md";
import { sendRequestTempStore } from "../../../store/sendRequestTempStore";

export const CONNECTION_REQUEST_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

const MemberSkeleton = () => {
  return (
    <div className="px-9 py-4 flex cursor-pointer border-l">
      <Skeleton circle width={48} height={48} />
      <div className="ml-4 flex-grow min-w-0 py-2">
        <Skeleton width={120} />
        <Skeleton width={60} height={14} />
      </div>
      <Skeleton circle width={48} height={48} />
    </div>
  );
};

const AcceptOrRejectRequest = ({ request }) => {
  const requestStatus = sendRequestTempStore((state) => state?.[request._id]);
  const changeRequestStatus = sendRequestTempStore((state) => state.cache);

  const { mutate, isLoading } = useRespondOnConnectionRequest({
    onSuccess: (values) => {
      changeRequestStatus({
        key: request._id,
        value: values?.connection?.status,
      });
    },
  });

  const sendRequest = async (status) => {
    mutate({
      connectionId: request._id,
      status,
    });
  };

  if (requestStatus === CONNECTION_REQUEST_STATUS.ACCEPTED)
    return (
      <IconButtonSecondary
        btitle="Your connection request has been accepted!"
        className="text-lg bg-green-400 text-white hover:bg-green-500 duration-300"
      >
        <IoCheckmarkDoneCircleOutline />
      </IconButtonSecondary>
    );

  if (requestStatus === CONNECTION_REQUEST_STATUS.REJECTED)
    return <RejectedRequestButton request={request} />;

  return (
    <div className="flex items-center">
      <IconButtonSecondary
        onClick={() => sendRequest(CONNECTION_REQUEST_STATUS.REJECTED)}
        btitle="Reject connection request!"
        className={`text-lg bg-red-400 text-white hover:bg-red-500 duration-300 mx-2 ${
          isLoading ? "cursor-wait" : ""
        }`}
      >
        <IoCloseSharp />
      </IconButtonSecondary>
      <IconButtonSecondary
        onClick={() => sendRequest(CONNECTION_REQUEST_STATUS.ACCEPTED)}
        btitle="Accept connection request!"
        className={`text-lg bg-green-400 text-white hover:bg-green-500 duration-300 ${
          isLoading ? "cursor-wait" : ""
        }`}
      >
        <MdDone />
      </IconButtonSecondary>
    </div>
  );
};

const PendingRequestButton = ({ request }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return null;

  if (data._id === request.recipient)
    return <AcceptOrRejectRequest request={request} />;

  return (
    <IconButtonSecondary
      btitle="Your connection request is pending!"
      className="text-lg bg-yellow-400 text-white hover:bg-yellow-500 duration-300"
    >
      <PiClockCountdownBold />
    </IconButtonSecondary>
  );
};

const UnBlockRequestButton = ({ request }) => {
  const requestStatus = sendRequestTempStore((state) => state?.[request._id]);
  const changeRequestStatus = sendRequestTempStore((state) => state.cache);

  if (requestStatus === CONNECTION_REQUEST_STATUS.PENDING)
    return <AcceptOrRejectRequest request={request} />;

  if (requestStatus === CONNECTION_REQUEST_STATUS.ACCEPTED)
    return (
      <IconButtonSecondary
        btitle="Your connection request has been accepted!"
        className="text-lg bg-green-400 text-white hover:bg-green-500 duration-300"
      >
        <IoCheckmarkDoneCircleOutline />
      </IconButtonSecondary>
    );

  return (
    <IconButtonSecondary
      onClick={() =>
        changeRequestStatus({
          key: request._id,
          value: CONNECTION_REQUEST_STATUS.PENDING,
        })
      }
      btitle="Accept the rejected connection request!"
      className="text-lg bg-purple-400 text-white hover:bg-purple-500 duration-300"
    >
      <CgUnblock />
    </IconButtonSecondary>
  );
};

const RejectedRequestButton = ({ request }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return null;

  if (data._id === request.recipient)
    return <UnBlockRequestButton request={request} />;

  return (
    <IconButtonSecondary
      btitle="Your connection request has been rejected!"
      className="text-lg bg-red-400 text-white hover:bg-red-500 duration-300"
    >
      <ImCancelCircle />
    </IconButtonSecondary>
  );
};

const SendRequestButton = ({ data }) => {
  const requestSent = sendRequestTempStore((state) => state?.[data._id]);
  const changeRequestStatus = sendRequestTempStore((state) => state.cache);
  const { mutate, isLoading } = useSendConnectionRequest({
    onSuccess: () => {
      changeRequestStatus({
        key: data._id,
        value: CONNECTION_REQUEST_STATUS.PENDING,
      });
    },
  });

  const sendRequest = async () => {
    mutate({
      recipientId: data._id,
    });
  };

  if (requestSent)
    return (
      <IconButtonSecondary
        btitle="Your connection request is pending!"
        className="text-lg bg-yellow-400 text-white hover:bg-yellow-500 duration-300"
      >
        <PiClockCountdownBold />
      </IconButtonSecondary>
    );

  return (
    <IconButtonSecondary
      onClick={sendRequest}
      btitle="Send a connection request!"
      className={`text-lg bg-blue-400 text-white hover:bg-blue-500 duration-300 ${
        isLoading ? "cursor-wait" : ""
      }`}
      disabled={isLoading}
    >
      <IoAddOutline />
    </IconButtonSecondary>
  );
};

const Member = ({ data }) => {
  return (
    <div className="px-9 py-4 flex cursor-pointer border-l hover:bg-blue-50">
      <div
        className={`${data?.full_name[0].toUpperCase()} w-12 h-12 rounded-2xl flex-shrink-0 flex justify-center items-center text-xl`}
      >
        {data?.full_name[0].toUpperCase()}
      </div>
      <div className="ml-4 flex-grow min-w-0 items-center">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data?.full_name}
        </h4>
        <p className="text-sm">@{data?.username}</p>
      </div>
      <div>
        {CONNECTION_REQUEST_STATUS.ACCEPTED === data?.connection.status ? (
          <IconButtonSecondary
            btitle="Your connection request has been accepted!"
            className="text-lg bg-green-400 text-white hover:bg-green-500 duration-300"
          >
            <IoCheckmarkDoneCircleOutline />
          </IconButtonSecondary>
        ) : CONNECTION_REQUEST_STATUS.PENDING === data?.connection.status ? (
          <PendingRequestButton request={data.connection} />
        ) : CONNECTION_REQUEST_STATUS.REJECTED === data?.connection.status ? (
          <RejectedRequestButton request={data.connection} />
        ) : (
          <SendRequestButton data={data} />
        )}
      </div>
    </div>
  );
};

const List = ({ payload }) => {
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchFriends(payload, {
    select: (data) => {
      return data.pages.flat();
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 0,
    cacheTime: 0,
  });

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

  if (isLoading)
    return (
      <div className="mt-4 h-[calc(100vh-230px)]">
        {Array.from({ length: 4 }, (_, index) => (
          <MemberSkeleton key={index} />
        ))}
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
    <div className="mt-4 h-[calc(100vh-230px)]">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={data.length + (hasNextPage ? 2 : 0)} // Adjust row count
          >
            {({ onRowsRendered, registerChild }) => (
              <VList
                height={height}
                width={width}
                rowHeight={80}
                rowCount={data.length + (isFetchingNextPage ? 2 : 0)} // Adjust row count
                rowRenderer={({ index, key, style }) => {
                  if (isFetchingNextPage && index >= data.length) {
                    return (
                      <div key={key} style={style}>
                        <MemberSkeleton />
                        <MemberSkeleton />
                      </div>
                    );
                  }

                  const member = data[index];
                  if (!member) return null;
                  return (
                    <div key={key} style={style}>
                      <Member data={member} />
                    </div>
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

const Filter = ({ closeTab }) => {
  const PAYLOAD_FOR = {
    SEARCH: "search",
    ...CONNECTION_REQUEST_STATUS,
  };

  const [username, setUsername] = useState("");
  const [searchFor, setSearchFor] = useState(PAYLOAD_FOR.SEARCH);

  const [debouncedUsername] = useDebounce(username, 300);
  return (
    <>
      <div className="px-10">
        <div className="flex items-center border-b pb-2">
          <IoSearch />
          <input
            placeholder="Search Friend by Username"
            className="flex-grow px-2 py-2 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <IconButtonSecondary
            onClick={closeTab}
            className="text-lg bg-slate-400 text-white hover:bg-slate-500 duration-300"
          >
            <IoClose />
          </IconButtonSecondary>
        </div>
      </div>

      <div className="flex px-10 mt-4 justify-between items-center">
        <SMButton
          isActive={searchFor === PAYLOAD_FOR.SEARCH}
          onClick={() => setSearchFor(PAYLOAD_FOR.SEARCH)}
        >
          Search
        </SMButton>
        <SMButton
          isActive={searchFor === PAYLOAD_FOR.PENDING}
          onClick={() => setSearchFor(PAYLOAD_FOR.PENDING)}
        >
          Pending
        </SMButton>
        <SMButton
          isActive={searchFor === PAYLOAD_FOR.ACCEPTED}
          onClick={() => setSearchFor(PAYLOAD_FOR.ACCEPTED)}
        >
          Accepted
        </SMButton>
        <SMButton
          isActive={searchFor === PAYLOAD_FOR.REJECTED}
          onClick={() => setSearchFor(PAYLOAD_FOR.REJECTED)}
        >
          Rejected
        </SMButton>
      </div>

      {searchFor === PAYLOAD_FOR.SEARCH ? (
        debouncedUsername?.length >= 3 ? (
          <List
            payload={{
              username: debouncedUsername,
              searchFor,
            }}
          />
        ) : (
          <div className="mt-4 p-4 text-center">
            Please Type In Username to Search friend!
            <br />
            <span className="text-yellow-500 text-sm">
              Minimum three characters required!
            </span>
          </div>
        )
      ) : (
        <List
          payload={{
            username: debouncedUsername,
            searchFor,
          }}
        />
      )}
    </>
  );
};

const SearchFriends = ({ closeTab }) => {
  const queryClient = useQueryClient();
  const sendRequestTempStoreClear = sendRequestTempStore(
    (state) => state.clear
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(QUERY_KEYS.SEARCH_FRIENDS);
      sendRequestTempStoreClear();
    };
  }, [queryClient, sendRequestTempStoreClear]);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-10 pt-10">
        <h4 className="text-2xl font-bold text-slate-700">
          Connection Requests
        </h4>
        <p className="text-slate-700 mb-4">
          Search Friends or Checkout requests!
        </p>
      </div>

      <Filter closeTab={closeTab} />
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
