import { cn } from "@/lib/utils";
import ReactQuill from "react-quill-new";

type Props = ReactQuill.ReactQuillProps;

const RichText = (props: Props) => {
  return (
    <ReactQuill
      theme="snow"
      className={cn("min-h-[200px] placeholder:text-white")}
      {...props}
    />
  );
};

export default RichText;
