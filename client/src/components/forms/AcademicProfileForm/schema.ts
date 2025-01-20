import { z } from "zod";

const formSchema = z.object({
  learnerReferenceNumber: z
    .string()
    .nonempty("Learner reference number is required"),
  yearLevel: z
    .string()
    .transform((value) => {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new Error("Year level must be a positive number");
      }
      return parsedValue;
    })
    .pipe(z.number().nonnegative("Year level must be a positive number")),
  course: z.string().nonempty("Course is required"),
  specialization: z.string().nonempty("Specialization is required"),
});

export type AcademicProfileFormProps = z.infer<typeof formSchema>;

export default formSchema;
