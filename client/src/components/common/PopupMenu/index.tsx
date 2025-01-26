import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";
import { SlOptionsVertical } from "react-icons/sl";

type MenuItem = {
  label: string;
  className?: string;
  onClick: () => void;
};

type Props = {
  trigger?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  direction?: "horizontal" | "vertical";
  items: (MenuItem | ReactNode)[];
};

const PopupMenu = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {props?.trigger || (
          <Button variant="ghost">
            <SlOptionsVertical />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        side={props.side || "left"}
        className={cn("flex flex-col p-0 items-start max-w-fit w-fit", {
          "flex-row": props.direction === "horizontal",
        })}
      >
        {props.items.map((item, index) => {
          if (!item) return null;

          if (!(typeof item === "object" && "label" in item)) {
            return <Fragment key={index}>{item}</Fragment>;
          }

          return (
            <Button
              variant={"ghost"}
              key={item.label}
              onClick={item.onClick}
              className={cn(
                "w-full min-w-[120px] rounded-none",
                item.className,
                {
                  "border-t": index !== 0,
                  "min-w-min": props.direction === "horizontal",
                }
              )}
            >
              {item.label}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default PopupMenu;
