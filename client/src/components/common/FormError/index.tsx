import { cn } from "@/lib/utils";
import { FormError as FormErrorType } from "@/types/form.type";

export type FormErrorProps = FormErrorType & {
  className?: string;
};

const FormError = (props: FormErrorProps) => {
  const { title, description, component, className } = props;

  return (
    <div
      className={cn(
        "bg-red-500/5 text-sm text-red-500 rounded-lg p-4 w-full",
        className
      )}
    >
      {title && <div className="font-bold">{title}</div>}
      <div className="opacity-70">{description}</div>
      {component && <div className="mt-2">{component}</div>}
    </div>
  );
};

export default FormError;
