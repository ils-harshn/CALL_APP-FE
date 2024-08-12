import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

const Search = ({
  placeholder = "Start Chat",
  className = "h-full w-full focus:outline-none bg-slate-100",
  ...props
}) => {
  return (
    <div className="w-full h-12 bg-slate-100 rounded-md flex px-4">
      <div className="h-full flex justify-center items-center text-xl">
        <LuSearch className="cursor-pointer" />
      </div>
      <div className="flex-grow mx-2">
        <input placeholder={placeholder} className={className} {...props} />
      </div>
    </div>
  );
};

const GroupTab = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="mt-4 px-10 py-4">
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default GroupTab;
