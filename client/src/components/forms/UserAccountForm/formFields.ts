import { FormField } from "@/types/form.type";
import { UserAccountFormProps } from "./schema";

type Fields = FormField & {
  name: keyof UserAccountFormProps;
};

const formFields: Fields[] = [
  {
    name: "roleId",
    label: "Role",
    type: "select",
    placeholder: "Select role",
    options: [],
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jude.cruz.au@phinmaed.com",
  },
  {
    name: "password",
    label: "Temporary Password",
    type: "text",
    placeholder: "Enter or generate temporary password",
  },
];

export default formFields;
