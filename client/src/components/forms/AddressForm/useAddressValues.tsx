import { useEffect } from "react";
import { AddressFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type IAddressValues = {
  values?: Omit<AddressFormProps, "isAddressSame">;
  form: UseFormReturn<AddressFormProps>;
};

const useAddressValues = (props: IAddressValues) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof AddressFormProps,
          value as AddressFormProps["permanent"]
        );
      });
    }
  }, [props.values]);
};

export default useAddressValues;
