import Skeleton from "react-loading-skeleton";
import { useProfile } from "../../../apis/auth/queryHooks";
import Logo from "../../../images/logo.png";
import { GoStarFill } from "react-icons/go";
import { IconButton } from "../../../components/Buttons";
import { IoDocumentText } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { RiShutDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes";
import notify from "../../../utils/notify";
import { LuMaximize, LuMinimize } from "react-icons/lu";
import { useEffect, useState } from "react";
import useSubTabState, { SUB_TABS } from "../../../store/subTabState";
import NotificationButton from "../../home/Notification";
import { useQueryClient } from "react-query";

const FullScreenToggleButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <IconButton
      onClick={toggleFullScreen}
      title={isFullScreen ? "Minimize screen" : "Maximize screen"}
    >
      {isFullScreen ? <LuMinimize /> : <LuMaximize />}
    </IconButton>
  );
};

const Logout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.clear();
    navigate(ROUTES.LOGIN);
    queryClient.clear();
    notify.info("Logged out successfully!");
  };

  return (
    <IconButton onClick={logout} title="Logout">
      <RiShutDownLine />
    </IconButton>
  );
};

const UserProfile = () => {
  const { data, isLoading } = useProfile();
  if (isLoading)
    return <Skeleton width={40} height={40} style={{ borderRadius: "50%" }} />;
  return (
    <div
      className={`${data?.full_name[0]?.toUpperCase()} w-10 h-10 rounded-full border flex justify-center items-center`}
      title={data?.username}
    >
      {data?.full_name[0]?.toUpperCase()}
    </div>
  );
};

export const SideMenubutton = ({ children, className = "" }) => {
  return (
    <li className={`${className} pt-7 flex justify-center`}>{children}</li>
  );
};

const AddFriendButton = () => {
  const isOpen = useSubTabState((state) => state.tab);
  const changeTab = useSubTabState((state) => state.changeTab);

  const toggleTab = () =>
    changeTab(SUB_TABS.ADD_FRIEND === isOpen ? null : SUB_TABS.ADD_FRIEND);

  return (
    <SideMenubutton>
      <IconButton onClick={toggleTab} isActive={SUB_TABS.ADD_FRIEND === isOpen}>
        <BsPeopleFill />
      </IconButton>
    </SideMenubutton>
  );
};

const SideBar = ({ className = "" }) => {
  return (
    <div
      className={`${className} w-24 border-r py-10 hover:border-r-black duration-300 cursor-pointer`}
    >
      <div className="flex justify-center border-b pb-9">
        <img alt="logo" src={Logo} className="h-10" />
      </div>

      <ul className="">
        <SideMenubutton>
          <UserProfile />
        </SideMenubutton>

        <SideMenubutton>
          <IconButton>
            <GoStarFill />
          </IconButton>
        </SideMenubutton>

        <SideMenubutton>
          <IconButton>
            <IoDocumentText />
          </IconButton>
        </SideMenubutton>

        <AddFriendButton />

        <SideMenubutton>
          <NotificationButton />
        </SideMenubutton>

        <SideMenubutton>
          <IconButton>
            <IoIosSettings />
          </IconButton>
        </SideMenubutton>

        <SideMenubutton>
          <FullScreenToggleButton />
        </SideMenubutton>

        <SideMenubutton>
          <Logout />
        </SideMenubutton>
      </ul>
    </div>
  );
};

export default SideBar;
