import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { AnnouncementFormProps } from "./schema";

const useAnnouncementForm = () => {
  const form = useForm<AnnouncementFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;

  return {
    form,
    errors,
  };
};

export default useAnnouncementForm;
