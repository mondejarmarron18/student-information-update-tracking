import { z } from "zod";

const schema = z.object({
  courseId: z.string().nonempty("Course is required"),
  name: z.string().nonempty("Specialization name is required"),
  description: z.string().nonempty("Specialization description is required"),
  details: z.string().optional(),
});

export type SpecializationFormProps = z.infer<typeof schema>;

export default schema;
