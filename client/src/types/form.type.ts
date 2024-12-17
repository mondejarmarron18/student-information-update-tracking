export type FormProps<Value> = {
  className?: string;
  onSubmit: (values: Value) => void;
  onSubmitLabel?: string;
};

export type FormField = {
  name: string;
  label: string;
  type:
    | "email"
    | "password"
    | "text"
    | "number"
    | "date"
    | "time"
    | "checkbox"
    | "radio"
    | "select";
  placeholder: string;
  hideError?: boolean;
};
