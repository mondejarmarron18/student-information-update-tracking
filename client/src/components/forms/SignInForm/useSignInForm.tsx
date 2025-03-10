import { useForm } from "react-hook-form";
import formSchema, { SignInFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultValues from "./defaultValues";

const useSignInForm = () => {
  const form = useForm<SignInFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useSignInForm;
