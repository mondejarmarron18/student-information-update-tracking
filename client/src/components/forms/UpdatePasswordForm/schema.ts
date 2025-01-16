import { z } from "zod";

const formSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z.string().nonempty("New password is required"),
    confirmNewPassword: z.string().nonempty("Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password cannot be same as current password",
    path: ["newPassword"],
  });

export type UpdatePasswordFormProps = z.infer<typeof formSchema>;

export default formSchema;
