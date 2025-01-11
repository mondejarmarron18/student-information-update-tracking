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
  current: values,
  isAddressSame: true,
};

export default defaultValues;
