import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipPrimitive,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

type Props = {
  trigger: ReactElement<HTMLButtonElement>;
  content: string;
  contentPosition?: "top" | "bottom" | "left" | "right";
};
const Tooltip = (props: Props) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>{props.trigger}</TooltipTrigger>
        <TooltipContent side={props.contentPosition}>
          <p className="text-sm">{props.content}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};

export default Tooltip;
