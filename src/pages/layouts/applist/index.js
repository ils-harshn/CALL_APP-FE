import { AiOutlineAppstore } from "react-icons/ai";
import { IconButtonSecondary } from "../../../components/Buttons";
import { CiFileOn } from "react-icons/ci";
import { CgNotes } from "react-icons/cg";
import { LuListTodo } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { IoHelp, IoInformationOutline } from "react-icons/io5";

const SideMenubutton = ({ children, className = "" }) => {
  return (
    <li className={`${className} pt-7 flex flex-col items-center`}>
      {children}
    </li>
  );
};

const AppList = () => {
  return (
    <div className="right-sidebar w-24 border-l flex flex-col justify-between">
      <ul className="">
        <SideMenubutton>
          <IconButtonSecondary className="text-2xl" title="Apps">
            <AiOutlineAppstore />
          </IconButtonSecondary>
        </SideMenubutton>

        <SideMenubutton>
          <IconButtonSecondary
            className="text-lg bg-green-100 text-green-500 hover:bg-green-200 duration-300"
            title="Files"
          >
            <CiFileOn />
          </IconButtonSecondary>
        </SideMenubutton>

        <SideMenubutton>
          <IconButtonSecondary
            className="text-lg bg-blue-100 text-blue-500 hover:bg-blue-200 duration-300"
            title="Notes"
          >
            <CgNotes />
          </IconButtonSecondary>
        </SideMenubutton>

        <SideMenubutton>
          <IconButtonSecondary
            className="text-lg bg-red-100 text-red-500 hover:bg-red-200 duration-300"
            title="Todo"
          >
            <LuListTodo />
          </IconButtonSecondary>
        </SideMenubutton>

        <SideMenubutton>
          <IconButtonSecondary
            className="text-lg bg-yellow-100 text-yellow-500 hover:bg-yellow-200 duration-300"
            title="Reminder"
          >
            <FaRegClock />
          </IconButtonSecondary>
        </SideMenubutton>
      </ul>

      <ul className="">
        <SideMenubutton className="pb-7">
          <IconButtonSecondary
            className="text-lg bg-purple-100 text-purple-500 hover:bg-purple-200 duration-300"
            title="About Us"
          >
            <IoInformationOutline />
          </IconButtonSecondary>
        </SideMenubutton>

        <SideMenubutton className="pb-7">
          <IconButtonSecondary
            className="text-lg bg-lime-100 text-lime-500 hover:bg-lime-200 duration-300"
            title="Help"
          >
            <IoHelp />
          </IconButtonSecondary>
        </SideMenubutton>
      </ul>
    </div>
  );
};

export default AppList;
