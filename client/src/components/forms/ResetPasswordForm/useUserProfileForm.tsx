import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { UserProfileFormProps } from "./schema";

const useRegisterForm = () => {
  const form = useForm<UserProfileFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useRegisterForm;
