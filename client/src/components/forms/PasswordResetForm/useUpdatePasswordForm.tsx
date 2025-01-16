import { useForm } from "react-hook-form";
import formSchema, { PasswordResetFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultValues from "./defaultValues";

const usePasswordResetForm = () => {
  const form = useForm<PasswordResetFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default usePasswordResetForm;
