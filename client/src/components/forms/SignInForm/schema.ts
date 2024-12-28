import { allowedLength } from "@/utils/validator";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z.string().nonempty("Password is required").min(allowedLength),
});

export type SignInFormProps = z.infer<typeof formSchema>;

export default formSchema;
