import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  nameExtension: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  phoneNumber: z.string().nonempty("Phone number is required"),
  sex: z.enum(["male", "female", "intersex"], {
    required_error: "Sex is required",
  }),
});

export type UserProfileFormProps = z.infer<typeof formSchema>;

export default formSchema;
