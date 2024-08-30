import { IoCall } from "react-icons/io5";
import useTabState from "../../../store/tabstate";
import Skeleton from "react-loading-skeleton";
import { useGetAcceptedConnections } from "../../../apis/connections/queryHooks";
import { useCallback } from "react";
import { InfiniteLoader, List as VList, AutoSizer } from "react-virtualized";

const ContactTabBox = ({ data }) => {
  const active = useTabState((state) => state.conTactselection);
  const setActive = useTabState((state) => state.changeConTactselection);

  return (
    <div
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        active?._id === data._id
          ? "bg-blue-50 border-l-blue-500"
          : "border-l-transparent"
      }`}
    >
      <div
        onClick={() => setActive(data)}
        className={`${data.full_name[0].toUpperCase()} w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative`}
      >
        {data.full_name[0].toUpperCase()}
      </div>

      <div onClick={() => setActive(data)} className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.full_name}
        </h4>
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-xs">
          {data.phone}
        </p>
      </div>

      <div className="flex items-center">
        <div className="bg-green-100 text-green-400 p-2 rounded-full duration-300 hover:bg-green-200 hover:text-green-500">
          <IoCall />
        </div>
      </div>
    </div>
  );
};

const ContactTabBoxSkeleton = () => {
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
          <ContactTabBoxSkeleton key={index} />
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
                      <ContactTabBoxSkeleton />
                      <ContactTabBoxSkeleton />
                    </div>
                  );
                }

                const connection = data[index];
                if (!connection) return null;
                return (
                  <div key={key} style={style}>
                    <ContactTabBox data={connection.user} />
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

const Contact = () => {
  return (
    <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto pb-16">
      <List />
    </div>
  );
};

export default Contact;
