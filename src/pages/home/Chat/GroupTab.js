import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import useTabState from "../../../store/tabstate";

const Search = ({
  placeholder = "Search group by name...",
  className = "h-full w-full focus:outline-none bg-slate-100",
  ...props
}) => {
  return (
    <div className="px-10 py-4">
      <div className="w-full h-12 bg-slate-100 rounded-md flex px-4">
        <div className="h-full flex justify-center items-center text-xl">
          <LuSearch className="cursor-pointer" />
        </div>
        <div className="flex-grow mx-2">
          <input placeholder={placeholder} className={className} {...props} />
        </div>
      </div>
    </div>
  );
};

const Group = ({ data, setActive, isActive = false }) => {
  return (
    <div
      onClick={setActive}
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        isActive ? "bg-blue-50 border-l-blue-500" : "border-l-transparent"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative">
        {data.name[0].toUpperCase()}
      </div>

      <div className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.name}
        </h4>
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.last_message}
        </p>
      </div>

      <div className="text-xs flex flex-col justify-end ml-4">
        <p>{data.last_message.date}</p>
      </div>
    </div>
  );
};

const GroupTab = () => {
  const [search, setSearch] = useState("");
  const active = useTabState((state) => state.gtSelection);
  const setActive = useTabState((state) => state.changeGtSelection);

  const data = [
    {
      id: "1",
      name: "Tech Ninjas",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "2",
      name: "Friends Group",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "3",
      name: "Home",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "4",
      name: "FAV DAWGS",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "5",
      name: "Panaji",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "6",
      name: "Photons",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "7",
      name: "Tito's Lane",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      id: "8",
      name: "15 AUG",
      last_message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];

  return (
    <div className="my-4">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="overflow-y-auto h-[calc(100vh-324px)]">
        {data.map((group) => (
          <Group
            key={group.id}
            data={group}
            isActive={active?.id === group.id}
            setActive={() => setActive(group)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupTab;
