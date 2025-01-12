import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import LogoutDialog from "../LogoutDialog";
import { Badge } from "@/components/ui/badge";
import useAccessToken from "@/hooks/useAccessToken";
import Tooltip from "../Tooltip";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Props = {
  trigger?: ReactNode;
};

const UserAccountMenu = (props: Props) => {
  const { decodedAccessToken } = useAccessToken();
  const user = decodedAccessToken();

  const verificationDate = user?.verifiedAt && format(user?.verifiedAt, "PPpp");

  return (
    <Popover>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex flex-col p-4 w-72 space-y-2"
      >
        <Tooltip
          trigger={
            <Button variant="ghost" size="sm" title={user?.email}>
              <span className="truncate w-36">{user?.email}</span>
              <Badge
                variant="outline"
                className={cn("text-xs", {
                  "border-primary": user?.verifiedAt,
                })}
              >
                {user?.verifiedAt ? "Verified" : "Not verified"}
              </Badge>
            </Button>
          }
          content={`${user?.email} verified at ${verificationDate}`}
        />

        {/* Status - Coming Soon */}
        {/* <Button
      variant="ghost"
      size="sm"
      className="flex items-center justify-start"
    >
      Active Status <Badge variant="outline">Coming soon</Badge>
    </Button> */}

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
        >
          Activity Log <Badge variant="outline">Coming soon</Badge>
        </Button>

        {/* Change Password */}
        <Button variant="ghost" size="sm" className="flex justify-start">
          Change Password
        </Button>

        {/* Logout */}
        <LogoutDialog
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="flex justify-start text-red-500 hover:text-red-500"
            >
              Logout
            </Button>
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default UserAccountMenu;
