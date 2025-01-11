import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { AddressFormProps } from "./schema";

const useAddressForm = () => {
  const form = useForm<AddressFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useAddressForm;
