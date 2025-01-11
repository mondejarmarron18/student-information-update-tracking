import { z } from "zod";

const addressSchema = z.object({
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"), //Also provinces
  city: z.string().nonempty("City is required"), //Also municipalities
  postalCode: z.string().nonempty("Zip code is required"),
  addressLine1: z.string().nonempty("Address line 1 is required"),
  addressLine2: z.string().optional(),
});

const formSchema = z.object({
  permanent: addressSchema,
  current: addressSchema,
  isAddressSame: z.boolean(),
});

export type AddressFormProps = z.infer<typeof formSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;

export default formSchema;
