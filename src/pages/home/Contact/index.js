import { IoCall } from "react-icons/io5";
import data from "../Contact/data";
import useTabState from "../../../store/tabstate";

const ContactTabBox = ({ data, setActive, isActive = false }) => {
  return (
    <div
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        isActive ? "bg-blue-50 border-l-blue-500" : "border-l-transparent"
      }`}
    >
      <div
        onClick={setActive}
        className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative"
      >
        {data.name[0].toUpperCase()}
      </div>

      <div onClick={setActive} className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.name}
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
const Contact = () => {
  const active = useTabState((state) => state.conTactselection);
  const setActive = useTabState((state) => state.changeConTactselection);

  return (
    <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto pb-16">
      {data.map((contact) => (
        <ContactTabBox
          key={contact.id}
          data={contact}
          isActive={active?.id === contact.id}
          setActive={() => setActive(contact)}
        />
      ))}
    </div>
  );
};

export default Contact;
