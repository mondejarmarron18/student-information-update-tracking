import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import LogoutDialog from "../LogoutDialog";
import { Badge } from "@/components/ui/badge";
import ChangePasswordDialog from "../ChangePasswordDialog";
import { useNavigate } from "react-router";
import { routePaths } from "@/routes";

type Props = {
  trigger?: ReactNode;
};

const UserAccountMenu = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col p-4 w-72 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
          onClick={() => navigate(routePaths.accountManagement.path)}
        >
          Account Management
        </Button>
        {/* Status - Coming Soon */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
        >
          Dark/Light Mode <Badge variant="outline">Coming soon</Badge>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
        >
          Activity Log <Badge variant="outline">Coming soon</Badge>
        </Button>

        {/* Change Password */}
        <ChangePasswordDialog
          trigger={
            <Button variant="ghost" size="sm" className="flex justify-start">
              Change Password
            </Button>
          }
        />

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
