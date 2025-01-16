import { FormField } from "@/types/form.type";
import { ForgotPasswordFormProps } from "./schema";

type Fields = FormField & {
  name: keyof ForgotPasswordFormProps;
};

const formFields: Fields[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@phinmaed.com",
  },
];

export default formFields;
