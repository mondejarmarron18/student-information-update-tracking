import { z } from "zod";

const formSchema = z.object({
  learnerReferenceNumber: z
    .string()
    .nonempty("Learner reference number is required"),
  yearLevel: z.string().nonempty("Year level is required"),
  courseId: z.string().nonempty("Course is required"),
  specializationId: z.string().nonempty("Specialization is required"),
});

export type AcademicProfileFormProps = z.infer<typeof formSchema>;

export default formSchema;
