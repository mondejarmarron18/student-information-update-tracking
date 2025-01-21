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
    name: "specializationIds",
    label: "Specializations",
    type: "select",
    placeholder: "Select specializations",
    options: [
      {
        label: "Specialization 1",
        value: "1",
      },
    ],
  },
];

export default formFields;
