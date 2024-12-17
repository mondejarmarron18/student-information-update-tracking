import { RegisterFormProps } from "./schema";

const formFields: {
  name: keyof RegisterFormProps;
  label: string;
  type: "email" | "password";
  placeholder: string;
}[] = [
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
