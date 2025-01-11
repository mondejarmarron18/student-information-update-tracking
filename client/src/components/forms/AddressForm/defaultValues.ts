import { AddressFormProps } from "./schema";

const values = {
  country: "",
  state: "",
  city: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
};

const defaultValues: AddressFormProps = {
  permanent: values,
  present: values,
  isAddressSame: true,
};

export default defaultValues;
