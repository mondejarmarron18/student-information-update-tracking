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
    placeholder: "Example: Juan",
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Example: Lopez",
    optional: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Example: Dela Cruz",
  },
  {
    name: "nameExtension",
    label: "Name Extension",
    type: "text",
    placeholder: "Example: Jr., Sr., II, III, Esq.",
    optional: true,
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    placeholder: "mm/dd/yyyy",
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
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "+63 9xx xxx xxxx",
  },
];

export default formFields;
