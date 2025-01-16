import { FormField } from "@/types/form.type";
import { UpdatePasswordFormProps } from "./schema";

type Fields = FormField & {
  name: keyof UpdatePasswordFormProps;
};

const formFields: Fields[] = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "password",
    placeholder: "******",
  },
];

export default formFields;
