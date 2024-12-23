import { FormField } from "@/types/form.type";
import { UserProfileFormProps } from "./schema";
type Fields = FormField & {
  name: keyof UserProfileFormProps;
};

const formFields: Fields[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Jude",
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Cruz",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Cruz",
  },
  {
    name: "sex",
    label: "Sex",
    type: "radio",
    placeholder: "Select sex",
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Intersex",
        value: "intersex",
      },
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "+63 9xx xxx xxxx",
  },
];

export default formFields;
