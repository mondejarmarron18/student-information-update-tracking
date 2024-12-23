import { z } from "zod";

const formSchema = z.object({
  learnerReferenceNumber: z
    .string()
    .nonempty("Learner reference number is required"),
  yearLevel: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year"], {
    required_error: "Year level is required",
  }),
  course: z.string().nonempty("Course is required"),
  specialization: z.string().nonempty("Specialization is required"),
});

export type AcademicProfileFormProps = z.infer<typeof formSchema>;

export default formSchema;
