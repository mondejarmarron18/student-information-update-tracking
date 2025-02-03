import { allowedLength } from "@/utils/validator";
import { z } from "zod";

const formSchema = z.object({
  roleId: z.string().nonempty("Role is required"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(
      allowedLength,
      `Password must be at least ${allowedLength} characters long`
    ),
});

export type UserAccountFormProps = z.infer<typeof formSchema>;

export default formSchema;
