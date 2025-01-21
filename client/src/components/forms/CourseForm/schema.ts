import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty("Course name is required"),
  description: z.string().nonempty("Course description is required"),
  specializationIds: z.array(z.string()).optional(),
});

export type CourseFormProps = z.infer<typeof schema>;

export default schema;
