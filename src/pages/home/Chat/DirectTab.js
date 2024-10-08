import { useCallback, useEffect } from "react";
import { useGetAcceptedConnections } from "../../../apis/connections/queryHooks";
import useTabState from "../../../store/tabstate";
import Skeleton from "react-loading-skeleton";
import { InfiniteLoader, List as VList, AutoSizer } from "react-virtualized";
import { DTMformatDate } from "../../../utils/dateFormaters";
import SOCKET_EVENTS from "../../../apis/socket/events";
import useSocketStore from "../../../store/socketStateStore";
import { userStatusStore } from "../../../store/userStatusStore";
import { useProfile } from "../../../apis/auth/queryHooks";
import {
  messagesSeenStatusStore,
  ownMessagesSeenStatusStore,
} from "../../../store/messagesSeenStatusStore";

export const message_status = {
  SEEN: "seen",
  SENT: "sent",
  SENDING: "sending",
  FAILED: "failed",
};

export const message_status_map = {
  [message_status.SEEN]: {
    color: "text-green-500",
    text: "Seen",
  },
  [message_status.SENT]: {
    color: "text-yellow-500",
    text: "Sent",
  },
  [message_status.SENDING]: {
    color: "text-slate-500",
    text: "Sending",
  },
  [message_status.FAILED]: {
    color: "text-red-500",
    text: "Failed",
  },
};

export const status = {
  OFFLINE: 0,
  ONLINE: 1,
  DND: 2,
};

export const status_color = {
  [status.OFFLINE]: "bg-red-500",
  [status.ONLINE]: "bg-green-500",
  [status.DND]: "bg-yellow-500",
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

const MemberStatus = ({ user }) => {
  const socket = useSocketStore((state) => state.socket);
  const user_status = userStatusStore((state) => state?.[user._id]);
  const update_status = userStatusStore((state) => state.cache);

  useEffect(() => {
    const handleStatusUpdate = (status) => {
      update_status({
        key: user._id,
        value: status,
      });
    };

    socket.on(SOCKET_EVENTS.STATUS_UPDATE(user._id), handleStatusUpdate);

    if (user_status === undefined)
      socket.emit(SOCKET_EVENTS.GET_STATUS, user._id);
    return () => {
      socket.off(SOCKET_EVENTS.STATUS_UPDATE(user._id), handleStatusUpdate);
    };
  }, [socket, user._id, user_status, update_status]);

  return (
    <div
      className={`absolute w-4 h-4 top-[-2px] right-[-2px] rounded-full border-2 border-white ${
        status_color[user_status ? status.ONLINE : status.OFFLINE]
      }`}
    ></div>
  );
};

const Member = ({ connection }) => {
  const { data: user } = useProfile();
  const active = useTabState((state) => state.dTSelection);
  const setActive = useTabState((state) => state.changeDTSelection);

  const isSender = user._id === connection.last_message.sender;
  const is_last_message_seen = messagesSeenStatusStore(
    (state) => state?.[connection.last_message._id]
  );

  const last_message_if_receiver = ownMessagesSeenStatusStore(
    (state) => state?.[connection.last_message._id]
  );

  const cache_last_message_if_receiver_on_click_connection =
    ownMessagesSeenStatusStore((state) => state.cache);

  return (
    <div
      onClick={() => {
        setActive(connection);
        if (user._id !== connection.last_message.sender) {
          cache_last_message_if_receiver_on_click_connection({
            key: connection.last_message._id,
            value: true,
          });
        }
      }}
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        active?._id === connection._id
          ? "bg-blue-50 border-l-blue-500"
          : "border-l-transparent"
      }`}
    >
      <div
        className={`${connection.user.full_name[0].toUpperCase()} w-12 h-12 rounded-2xl flex-shrink-0 flex justify-center items-center text-xl relative`}
      >
        <MemberStatus user={connection.user} />
        {connection.user.full_name[0].toUpperCase()}
      </div>

      <div className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {connection.user.full_name}
        </h4>
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {connection.last_message.content.slice(0, 40)}
        </p>
      </div>

      <div className="text-xs flex flex-col justify-center ml-4">
        <p>{DTMformatDate(connection.last_message.updatedAt)}</p>
        {isSender ? (
          is_last_message_seen ? (
            <>
              <p
                className={`${
                  message_status_map[message_status.SEEN].color
                } font-bold`}
              >
                {message_status_map[message_status.SEEN].text}
              </p>
            </>
          ) : (
            <>
              <p
                className={`${
                  message_status_map[
                    connection.last_message?.status || message_status.SEEN
                  ].color
                } font-bold`}
              >
                {
                  message_status_map[
                    connection.last_message?.status || message_status.SEEN
                  ].text
                }
              </p>
            </>
          )
        ) : connection.last_message?.status === "seen" ||
          last_message_if_receiver ? null : (
          <div className="rounded-full w-3 h-3 bg-green-400 mt-1"></div>
        )}
      </div>
    </div>
  );
};

const List = () => {
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAcceptedConnections(10, {
    select: (data) => {
      return data.pages.flat();
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
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

                const connection = data[index];
                if (!connection) return null;
                return (
                  <div key={key} style={style}>
                    <Member connection={connection} />
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
  );
};

const DirectTab = () => {
  return (
    <div className="mt-4 h-[calc(100vh-244px)] overflow-y-auto">
      <List />
      <div className="pb-16"></div>
    </div>
  );
};

export default DirectTab;
