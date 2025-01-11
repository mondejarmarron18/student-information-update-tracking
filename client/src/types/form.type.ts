import { ReactNode } from "react";

export type FormProps<Value> = {
  className?: string;
  values?: Value;
  onSubmit: (values: Value) => void;
  onCancelLabel?: ReactNode;
  onCancel?: () => void;
  onSubmitLabel?: ReactNode;
  onSubmitLoading?: boolean;
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
        | "number"
        | "textarea";
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
