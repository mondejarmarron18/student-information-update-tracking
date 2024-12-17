import { SignInFormProps } from "./schema";

type Fields = {
  name: keyof SignInFormProps;
  label: string;
  type: "email" | "password";
  placeholder: string;
  hideError?: boolean;
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
