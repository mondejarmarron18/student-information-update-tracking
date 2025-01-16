import { useForm } from "react-hook-form";
import formSchema, { UpdatePasswordFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultValues from "./defaultValues";

const useUpdatePasswordForm = () => {
  const form = useForm<UpdatePasswordFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useUpdatePasswordForm;
