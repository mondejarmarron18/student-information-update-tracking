import { FormField } from "@/types/form.type";
import { PasswordResetFormProps } from "./schema";

type Fields = FormField & {
  name: keyof PasswordResetFormProps;
};

const formFields: Fields[] = [
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
  },
];

export default formFields;
