import { FormField } from "@/types/form.type";
import { AcademicProfileFormProps } from "./schema";

type Fields = FormField & {
  name: keyof AcademicProfileFormProps;
};

const formFields: Fields[] = [
  {
    name: "learnerReferenceNumber",
    label: "Learner Reference Number",
    type: "text",
    placeholder: "01 xxxx xxxxx",
  },
  {
    name: "yearLevel",
    label: "Year Level",
    type: "select",
    placeholder: "Select year level",
    options: [],
  },
  {
    name: "courseId",
    label: "Course",
    type: "select",
    placeholder: "Select course",
    options: [],
  },
  {
    name: "specializationId",
    label: "Specialization",
    type: "select",
    placeholder: "Select specialization",
    options: [],
  },
];

export default formFields;
