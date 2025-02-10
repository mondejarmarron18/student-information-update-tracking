import { GrFormPrevious } from "react-icons/gr";
// import { HiMiniAcademicCap } from "react-icons/hi2";
import { MdSpaceDashboard, MdPerson } from "react-icons/md";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
// import { GrAnnounce } from "react-icons/gr";
// import { RiProfileFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import Tooltip from "../Tooltip";
import { IconType } from "react-icons/lib";
import { routePaths } from "@/routes";
import { memo, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import screenSize from "@/utils/screenSize";
import UserAccountMenu from "../UserAccountMenu";
import { Card } from "@/components/ui/card";
// import { PiChatsCircleFill } from "react-icons/pi";
import { AiOutlineAudit } from "react-icons/ai";
import { LiaSchoolSolid } from "react-icons/lia";
import { TbUsersGroup } from "react-icons/tb";
import useActiveRoute from "@/hooks/useActiveRoute";
import useAccessToken from "@/hooks/useAccessToken";
import { RoutePath } from "@/routes/routePaths";

type NavItems = {
  iconType: IconType;
} & Pick<RoutePath, "roles" | "name" | "path">;

// eslint-disable-next-line react-refresh/only-export-components
export const navItems: NavItems[] = [
  {
    ...routePaths.dashboard,
    iconType: MdSpaceDashboard,
  },
  // {
  //   ...routePaths.conversations,
  //   iconType: PiChatsCircleFill,
  // },
  // {
  //   ...routePaths.announcements,
  //   iconType: GrAnnounce,
  // },
  {
    ...routePaths.academicManagement,
    iconType: LiaSchoolSolid,
  },
  // {
  //   ...routePaths.userProfile,
  //   iconType: RiProfileFill,
  // },
  // {
  //   ...routePaths.academicProfile,
  //   iconType: HiMiniAcademicCap,
  // },
  {
    ...routePaths.updateRequests,
    iconType: HiClipboardDocumentCheck,
  },
  {
    ...routePaths.userAccounts,
    iconType: TbUsersGroup,
  },
  {
    ...routePaths.auditLogs,
    iconType: AiOutlineAudit,
  },
];

const NavigationBar = () => {
  const navigate = useNavigate();
  const { decodedAccessToken } = useAccessToken();
  const userRole = decodedAccessToken()?.roleId?.name;

  const [navCollapsed, setNavCollapsed] = useState(true);

  const activeRoute = useActiveRoute();

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      if (screenSize.isTablet()) {
        setNavCollapsed(true);
      }
    });
  }, []);

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
        className={cn(
          "w-5 h-5 shink-0 text-gray-800 dark:text-white transition-transform",
          {
            "scale-75": !navCollapsed,
          }
        )}
      />
    );
  };

  return (
    <Card className="flex h-fit shrink-0 lg:h-full lg:flex-col lg:justify-between overflow-auto p-2 gap-2 justify-center  rounded-xl">
      <Tooltip
        content="Menu"
        trigger={
          <button
            onClick={toggleNavCollapsed}
            className="rounded-lg bg-gray-500/40 opacity-50 hover:opacity-100 transition-colors p-3 hidden lg:flex items-center"
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
        {navItems.map((navItem) => {
          if (!navItem.roles?.includes(userRole as string) && navItem.roles) {
            return null;
          }

          return (
            <Tooltip
              key={navItem.name}
              content={navItem.name}
              trigger={
                <button
                  name={navItem.name}
                  className={cn(
                    "rounded-lg flex bg-gray-500/40 items-center opacity-50 hover:bg-gray-500/70 transition-colors p-3",
                    {
                      "opacity-100 bg-gray-500/80":
                        activeRoute?.path === navItem.path,
                    }
                  )}
                  onClick={() => navigate(navItem.path)}
                >
                  {renderIcon(navItem.iconType)}
                  {renderText(navItem.name)}
                </button>
              }
            />
          );
        })}
      </div>

      <UserAccountMenu
        trigger={
          <button
            className={cn(
              "rounded-lg bg-gray-500/40 hover:opacity-100 transition-all p-3 flex items-center opacity-50"
            )}
          >
            <div
              className={cn("w-5 h-5 transition-transform rounded-none", {
                "scale-75": !navCollapsed,
              })}
            >
              {renderIcon(MdPerson)}
            </div>
            {renderText("Account Settings")}
          </button>
        }
      />
    </Card>
  );
};

export default memo(NavigationBar);
