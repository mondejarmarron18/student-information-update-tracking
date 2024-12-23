import { useForm } from "react-hook-form";
import formSchema, { StudentGuardianFormProps } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultValues from "./defaultValues";

const useStudentGiardianForm = () => {
  const form = useForm<StudentGuardianFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useStudentGiardianForm;
