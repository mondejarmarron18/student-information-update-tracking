import { FormField } from "@/types/form.type";
import { UserAccountFormProps } from "./schema";

type Fields = FormField & {
  name: keyof UserAccountFormProps;
};

const formFields: Fields[] = [
  {
    name: "roledId",
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
];

export default formFields;
