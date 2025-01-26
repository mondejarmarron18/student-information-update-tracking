import { FormField } from "@/types/form.type";
import { SpecializationFormProps } from "./schema";

const formFields: (FormField & { name: keyof SpecializationFormProps })[] = [
  {
    name: "courseId",
    label: "Course",
    type: "select",
    placeholder: "Select course",
    options: [],
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Specialization name...",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Specialization description...",
  },
  {
    name: "details",
    label: "Details",
    type: "richtext",
    placeholder: "Specialization details...",
  },
];

export default formFields;
