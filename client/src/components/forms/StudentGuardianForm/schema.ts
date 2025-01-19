import { mobileNumberRegex } from "@/utils/validator";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  nameExtension: z.string().optional(),
  relationship: z.string().nonempty("Relationship is required"),
  email: z.string().optional().or(z.string().email("Invalid email")),
  phoneNumber: z.string().regex(mobileNumberRegex, "Invalid phone number"),
});

export type StudentGuardianFormProps = z.infer<typeof formSchema>;

export default formSchema;
