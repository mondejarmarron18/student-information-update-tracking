import { GrFormPrevious } from "react-icons/gr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { MdNotifications, MdSpaceDashboard } from "react-icons/md";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { RiProfileFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import Tooltip from "../Tooltip";
import { IconType } from "react-icons/lib";
import { routePaths } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { useLayoutEffect, useState } from "react";
import { UserProfile } from "@/types/userProfile.type";
import { useLocation, useNavigate } from "react-router";
import screenSize from "@/utils/screenSize";
import UserAccountMenu from "../UserAccountMenu";

type NavItems = {
  name: string;
  path: string;
  iconType: IconType;
};

export const navItems: NavItems[] = [
  {
    name: "Nofitications",
    path: routePaths.studentGuardian,
    iconType: MdNotifications,
  },
  {
    name: "Dashboard",
    path: routePaths.dashboard,
    iconType: MdSpaceDashboard,
  },
  {
    name: "Personal Profile",
    path: routePaths.userProfile,
    iconType: RiProfileFill,
  },
  {
    name: "Academic Profile",
    path: routePaths.academicProfile,
    iconType: HiMiniAcademicCap,
  },
  {
    name: "Update Requests",
    path: routePaths.address,
    iconType: HiClipboardDocumentCheck,
  },
];

const NavigationBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: userProfileData } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => api.get("/user-profiles/me"),
  });
  const { data: AcadProfileData } = useQuery({
    queryKey: ["academic-profile"],
    queryFn: () => api.get("/academic-profiles/me"),
  });
  const { data: userAccount } = useQuery({
    queryKey: ["user-account"],
    queryFn: () => api.get("/users/me"),
  });
  const [navCollapsed, setNavCollapsed] = useState(true);
  const userProfile: UserProfile = userProfileData?.data;
  const acadProfile: unknown = AcadProfileData?.data;

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      if (screenSize.isTablet()) {
        setNavCollapsed(true);
      }
    });
  }, []);

  console.log({ userProfile, acadProfile, userAccount });

  const toggleNavCollapsed = () => {
    setNavCollapsed((prev) => !prev);
  };

  const renderText = (text: string) => {
    return (
      <div
        className={cn(
          "text-xs font-bold text-nowrap text-left transition-all w-0 m-0 overflow-hidden",
          {
            "w-full mr-2 ml-3": !navCollapsed,
          }
        )}
      >
        {text}
      </div>
    );
  };

  const renderIcon = (Icon: IconType) => {
    return (
      <Icon
        className={cn("w-5 h-5 shink-0 transition-transform", {
          "scale-75": !navCollapsed,
        })}
      />
    );
  };

  return (
    <aside className="flex h-fit shrink-0 lg:h-full lg:flex-col lg:justify-between overflow-auto bg-gray-500/20 p-2 gap-2 justify-center  rounded-xl">
      <Tooltip
        content="Menu"
        trigger={
          <button
            onClick={toggleNavCollapsed}
            className="rounded-lg bg-gray-500/20 opacity-50 hover:bg-gray-500/50 transition-colors p-3 hidden lg:flex items-center"
          >
            <div
              className={cn("rotate-180 transition-transform", {
                "rotate-0": !navCollapsed,
              })}
            >
              {renderIcon(GrFormPrevious)}
            </div>

            {renderText("Menu")}
          </button>
        }
      />
      <div className="flex lg:flex-col gap-2">
        {navItems.map((navItem) => (
          <Tooltip
            key={navItem.name}
            content={navItem.name}
            trigger={
              <button
                name={navItem.name}
                className={cn(
                  "rounded-lg flex bg-gray-500/20 items-center opacity-50 hover:bg-gray-500/50 transition-colors p-3",
                  {
                    "opacity-100 bg-gray-500/80": pathname === navItem.path,
                  }
                )}
                onClick={() => navigate(navItem.path)}
              >
                {renderIcon(navItem.iconType)}
                {renderText(navItem.name)}
              </button>
            }
          />
        ))}
      </div>

      <UserAccountMenu
        trigger={
          <button
            className={cn(
              "rounded-lg bg-gray-500/20 hover:bg-gray-500/50 transition-colors p-3 flex items-center opacity-50"
            )}
          >
            <Avatar
              className={cn("w-5 h-5 transition-transform rounded-none", {
                "scale-75": !navCollapsed,
              })}
            >
              <AvatarImage
                src="Academic Profile"
                alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
              />
              <AvatarFallback className="font-extrabold bg-transparent rounded-none text-xs uppercase">
                {userProfile?.firstName[0]}
                {userProfile?.lastName[0]}
              </AvatarFallback>
            </Avatar>
            {renderText("Account")}
          </button>
        }
      />
    </aside>
  );
};

export default NavigationBar;
