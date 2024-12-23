import { FormField } from "@/types/form.type";
import { SignInFormProps } from "./schema";

type Fields = FormField & {
  name: keyof SignInFormProps;
};

const formFields: Fields[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@phinmaed.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "******",
    hideError: true,
  },
];

export default formFields;
