import { z } from "zod";

export const validateGuardian = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  nameExtension: z.string().optional(),
  relationship: z.string().nonempty("Relationship is required"),
  email: z.string().email().or(z.literal("")).optional(),
  phoneNumber: z.string().nonempty("Phone number is required"),
});

export const validateAcadProfile = z.object({
  learnerReferenceNumber: z
    .string()
    .nonempty("Learner reference number is required"),
  yearLevelId: z.string().nonempty("Year level is required"),
  courseId: z.string().nonempty("Course is required"),
  specializationId: z.string().nonempty("Specialization is required"),
  guardians: z.array(validateGuardian).nonempty("Guardian is required"),
});
