import { useForm } from "react-hook-form";
import formSchema, { SignInFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

const useSignInForm = () => {
  const form = useForm<SignInFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return form;
};

export default useSignInForm;
