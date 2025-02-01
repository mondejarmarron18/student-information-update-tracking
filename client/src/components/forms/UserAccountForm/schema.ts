import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty("Course name is required"),
  description: z.string().optional(),
});

export type YearLevelFormProps = z.infer<typeof schema>;

export default schema;
