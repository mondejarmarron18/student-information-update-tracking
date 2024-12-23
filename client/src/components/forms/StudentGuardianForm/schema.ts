import { mobileNumberRegex } from "@/utils/validator";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().refine((val) => {
    if (val === "") return true;

    return val.length >= 2;
  }, "Middle name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name is required"),
  relationship: z.string().nonempty("Relationship is required"),
  phoneNumber: z.string().regex(mobileNumberRegex, "Invalid phone number"),
});

export type StudentGuardianFormProps = z.infer<typeof formSchema>;

export default formSchema;
