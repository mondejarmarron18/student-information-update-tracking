import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  trigger: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  direction?: "horizontal" | "vertical";
  menu: ({
    label: string;
    className?: string;
  } & (
    | { onClick: () => void; link?: never }
    | { link: string; onClick?: never }
  ))[];
};

const PopupMenu = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent
        side={props.side || "left"}
        className={cn("flex flex-col p-0 items-start max-w-fit w-fit", {
          "flex-row": props.direction === "horizontal",
        })}
      >
        {props.menu.map((item, index) => (
          <Button
            variant={"ghost"}
            key={item.label}
            onClick={() => {
              if (item.link) {
                return navigate(item.link);
              }

              item.onClick?.();
            }}
            className={cn("w-full min-w-[120px] rounded-none", item.className, {
              "border-t": index !== 0,
              "min-w-min": props.direction === "horizontal",
            })}
          >
            {item.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PopupMenu;
