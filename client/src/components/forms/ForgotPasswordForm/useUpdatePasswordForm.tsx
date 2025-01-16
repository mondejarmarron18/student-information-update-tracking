import { useForm } from "react-hook-form";
import formSchema, { ForgotPasswordFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultValues from "./defaultValues";

const useForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useForgotPasswordForm;
