import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  value: string;
};
const RichTextValue = ({ value, ...rest }: Props) => {
  return (
    <div {...rest} className={cn("ql-snow", rest.className)}>
      <div
        className="ql-editor readonly"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </div>
  );
};

export default RichTextValue;
