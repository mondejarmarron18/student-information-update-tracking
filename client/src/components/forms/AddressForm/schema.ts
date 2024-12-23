import { z } from "zod";

const addressSchema = z.object({
  houseNumber: z.string().nonempty("House number is required"),
  street: z.string().nonempty("Street is required"),
  barangay: z.string().nonempty("Barangay is required"),
  city: z.string().nonempty("City is required"),
  province: z.string().nonempty("Province is required"),
  region: z.string().nonempty("Region is required"),
  country: z.string().nonempty("Country is required"),
  zipCode: z.string().nonempty("Zip code is required"),
});

const formSchema = z.object({
  permanent: addressSchema,
  present: addressSchema,
  isAddressSame: z.boolean(),
});

export type AddressFormProps = z.infer<typeof formSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;

export default formSchema;
