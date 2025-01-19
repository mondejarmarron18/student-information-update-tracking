import { FormField } from "@/types/form.type";
import { AcademicProfileFormProps } from "./schema";
import courses from "@/constants/courses";
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
    options: [
      {
        label: "1st Year",
        value: 1,
      },
      {
        label: "2nd Year",
        value: 2,
      },
      {
        label: "3rd Year",
        value: 3,
      },
      {
        label: "4th Year",
        value: 4,
      },
    ],
  },
  {
    name: "course",
    label: "Course",
    type: "select",
    placeholder: "Select course",
    options: courses.map((course) => ({
      label: course.name,
      value: course.id,
    })),
  },
  {
    name: "specialization",
    label: "Specialization",
    type: "select",
    placeholder: "Select specialization",
    options: [],
  },
];

export default formFields;
