import { AnimatePresence, motion } from "framer-motion";
import { IoAddOutline, IoClose, IoSearch } from "react-icons/io5";
import { IconButton, IconButtonSecondary } from "../../../components/Buttons";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";
import { useState, useCallback } from "react";
import { InfiniteLoader, List as VList, AutoSizer } from "react-virtualized";
import { useDebounce } from "use-debounce";
import { useSearchFriends } from "../../../apis/addFriends/queryHooks";
import Skeleton from "react-loading-skeleton";

const MemberSkeleton = () => {
  return (
    <div className="px-9 py-4 flex cursor-pointer border-l">
      <Skeleton circle width={48} height={48} />
      <div className="ml-4 flex-grow min-w-0 py-2">
        <Skeleton width={120} />
      </div>
      <Skeleton circle width={48} height={48} />
    </div>
  );
};

const Member = ({ data }) => {
  return (
    <div className="px-9 py-4 flex cursor-pointer border-l hover:bg-blue-50">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl">
        {data?.full_name[0].toUpperCase()}
      </div>
      <div className="ml-4 flex-grow min-w-0 items-center py-2">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data?.full_name}
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

const List = ({ payload }) => {
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchFriends(payload, {});

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
      <div className="mt-4 h-[calc(100vh-108px)]">
        {Array.from({ length: 4 }, (_, index) => (
          <MemberSkeleton key={index} />
        ))}
      </div>
    );

  if (isLoading === false && data?.length === 0)
    return (
      <div className="mt-8 p-4 text-center">
        No user found with this username!
      </div>
    );

  return (
    <div className="mt-4 h-[calc(100vh-108px)]">
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

const SearchFriends = ({ closeTab }) => {
  const [payload, setPayload] = useState({
    username: "",
  });

  const [debouncedPayload] = useDebounce(payload, 300);

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
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, username: e.target.value }))
            }
          ></input>
          <IconButtonSecondary
            onClick={closeTab}
            className="text-lg bg-slate-400 text-white hover:bg-slate-500 duration-300"
          >
            <IoClose />
          </IconButtonSecondary>
        </div>
      </div>
      {debouncedPayload.username ? (
        <List payload={debouncedPayload} />
      ) : (
        <div className="mt-8 p-4 text-center">
          Please Type In Username to Search friend!
        </div>
      )}
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
