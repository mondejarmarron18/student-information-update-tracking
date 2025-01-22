import { FormField } from "@/types/form.type";
import { CourseFormProps } from "./schema";

const formFields: (FormField & { name: keyof CourseFormProps })[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Course name...",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Course description...",
  },
  {
    name: "details",
    label: "Details",
    type: "richtext",
    placeholder: "Course details...",
  },
];

export default formFields;
