import { array, z } from "zod";
import contactMethods from "../../../constants/contactMethods";

export const validateAddress = z.object({
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"), //Also provinces
  city: z.string().nonempty("City is required"), //Also municipalities
  postalCode: z.string().nonempty("Zip code is required"),
  addressLine1: z.string().nonempty("Address line 1 is required"),
  addressLine2: z.string().optional(),
});

export const validateUserProfile = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  nameExtension: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  phoneNumber: z.string().nonempty("Phone number is required"),
  contactMethods: z
    .array(z.nativeEnum(contactMethods))
    .optional()
    .refine((arr) => (arr ? new Set(arr).size === arr.length : true), {
      message: "Contact methods must be unique",
    }),
  address: z.object({
    current: validateAddress,
    permanent: validateAddress,
  }),
});
