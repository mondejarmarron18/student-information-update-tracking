import { cn } from "@/lib/utils";
import { routePaths } from "@/routes";
import { MdNotifications } from "react-icons/md";
import { useLocation } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const { pathname } = useLocation();
  const title = Object.values(routePaths).find(
    ({ path }) => path === pathname
  )?.name;

  const notifications = [
    {
      id: 1,
      title: "Update Request",
      description: "New update request from John Doe. Please review.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      title: "Profile Update Approved",
      description: "Your profile update has been approved.",
      timestamp: "9:15 AM",
    },
    {
      id: 3,
      title: "Request Rejected",
      description:
        "Your request was rejected due to missing info.asdfasdfasdfasdf",
      timestamp: "8:00 AM",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold">{title}</h1>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "rounded-lg flex bg-gray-500/50 items-center opacity-50 hover:opacity-100 transition-colors p-3"
            )}
          >
            <MdNotifications className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-4 w-80 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center text-sm text-gray-400">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col border-t space-y-1 hover:bg-gray-500/20 px-4 py-3 cursor-pointer transition-colors"
              >
                <div className="font-semibold text-sm text-gray-300">
                  {notification.title}
                </div>
                <div className="text-xs text-gray-400 line-clamp-2">
                  {notification.description}
                </div>
                <div className="text-xs text-gray-500">
                  {notification.timestamp}
                </div>
              </div>
            ))
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Header;
