export type FormProps<Value> = {
  className?: string;
  onSubmit: (values: Value) => void;
  onSubmitLabel?: string;
};

export type FormField = {
  name: string;
  label: string;
  hideError?: boolean;
  placeholder: string;
  optional?: boolean;
} & (
  | {
      type:
        | "email"
        | "password"
        | "text"
        | "number"
        | "date"
        | "time"
        | "checkbox"
        | "tel"
        | "number";
    }
  | {
      type: "select" | "radio";
      options: {
        label: string;
        value: string;
        tooltip?: string;
      }[];
    }
);
