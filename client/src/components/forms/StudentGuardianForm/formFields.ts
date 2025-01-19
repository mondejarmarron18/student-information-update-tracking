import { FormField } from "@/types/form.type";
import { StudentGuardianFormProps } from "./schema";

type Fields = FormField & {
  name: keyof StudentGuardianFormProps;
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
    name: "nameExtension",
    label: "Name Extension",
    type: "text",
    placeholder: "Jr., Sr., II, III, Esq.",
    optional: true,
  },
  {
    name: "relationship",
    label: "Relationship",
    placeholder: "Select relationship to student",
    type: "select",
    options: [
      { label: "Parent", value: "parent" },
      { label: "Sibling", value: "sibling" },
      { label: "Grandparent", value: "grandparent" },
      { label: "Relative", value: "relative" },
      { label: "Guardian", value: "guardian" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "your_guardian@example.com",
    optional: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "+639xx xxx xxxx",
  },
];

export default formFields;
