import { z } from "zod";

const formSchema = z.object({
  password: z.string().nonempty("Password is required").min(6),
  confirmPassword: z.string().nonempty("Confirm password is required"),
});

export type PasswordResetFormProps = z.infer<typeof formSchema>;

export default formSchema;
