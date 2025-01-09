import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import LogoutDialog from "../LogoutDialog";
import { Badge } from "@/components/ui/badge";

type Props = {
  trigger?: ReactNode;
};

const UserAccountMenu = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 w-fit">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
        >
          Active Status <Badge variant={"outline"}>Coming soon</Badge>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start"
        >
          Activity Log <Badge variant={"outline"}>Coming soon</Badge>
        </Button>
        <Button variant="ghost" size="sm" className="flex justify-start">
          Change Password
        </Button>
        <LogoutDialog
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="flex justify-start text-red-500"
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
