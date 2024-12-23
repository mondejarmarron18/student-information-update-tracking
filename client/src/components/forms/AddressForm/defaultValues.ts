import { AddressFormProps } from "./schema";

const values = {
  houseNumber: "",
  street: "",
  barangay: "",
  city: "",
  province: "",
  region: "",
  zipCode: "",
  country: "",
};

const defaultValues: AddressFormProps = {
  permanent: values,
  present: values,
  isAddressSame: true,
};

export default defaultValues;
