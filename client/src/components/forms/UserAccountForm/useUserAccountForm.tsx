import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { UserAccountFormProps } from "./schema";

const useUserAccountForm = () => {
  const form = useForm<UserAccountFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useUserAccountForm;
