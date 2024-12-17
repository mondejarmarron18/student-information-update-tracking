import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInFormProps = z.infer<typeof formSchema>;

export default formSchema;
