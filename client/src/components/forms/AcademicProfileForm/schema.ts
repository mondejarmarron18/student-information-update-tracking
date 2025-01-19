import { z } from "zod";

const formSchema = z.object({
  learnerReferenceNumber: z
    .string()
    .nonempty("Learner reference number is required"),
  yearLevel: z.number().nonnegative("Year level must be a positive number"),
  course: z.string().nonempty("Course is required"),
  specialization: z.string().nonempty("Specialization is required"),
});

export type AcademicProfileFormProps = z.infer<typeof formSchema>;

export default formSchema;
