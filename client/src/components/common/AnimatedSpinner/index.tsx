import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  className?: string;
};

const AnimatedSpinner = (props: Props) => {
  return <AiOutlineLoading className={cn("animate-spin", props.className)} />;
};

export default AnimatedSpinner;
