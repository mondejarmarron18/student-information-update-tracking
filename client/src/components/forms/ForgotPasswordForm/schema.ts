import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type ForgotPasswordFormProps = z.infer<typeof formSchema>;

export default formSchema;
