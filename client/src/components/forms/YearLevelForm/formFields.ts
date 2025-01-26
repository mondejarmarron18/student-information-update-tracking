import { FormField } from "@/types/form.type";
import { YearLevelFormProps } from "./schema";

const formFields: (FormField & { name: keyof YearLevelFormProps })[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Year level name...",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Year level description...",
  },
];

export default formFields;
