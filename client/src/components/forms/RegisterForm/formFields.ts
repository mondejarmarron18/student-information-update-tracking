import { FormField } from "@/types/form.type";
import { RegisterFormProps } from "./schema";

type Fields = FormField & {
  name: keyof RegisterFormProps;
};

const formFields: Fields[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jude.cruz.au@phinmaed.com",
  },
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
