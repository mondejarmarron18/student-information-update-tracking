import { allowedLength } from "@/utils/validator";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(allowedLength, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormProps = z.infer<typeof formSchema>;

export default formSchema;
