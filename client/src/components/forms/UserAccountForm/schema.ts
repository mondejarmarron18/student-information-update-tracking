import { z } from "zod";

const formSchema = z.object({
  roledId: z.string().nonempty("Role is required"),
  email: z.string().email("Please enter a valid email"),
});

export type UserAccountFormProps = z.infer<typeof formSchema>;

export default formSchema;
