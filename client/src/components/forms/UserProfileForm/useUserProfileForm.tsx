import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { UserProfileFormProps } from "./schema";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { reactQueryError } from "@/utils/errorHandler";
import useUserProfile from "@/hooks/useUserProfile";

const useRegisterForm = () => {
  const form = useForm<UserProfileFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;
  const { data: userProfile, error } = useUserProfile();

  useEffect(() => {
    const data = userProfile?.data;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        form.setValue(key as keyof UserProfileFormProps, value as string);
      });
    }

    if (error instanceof AxiosError) {
      const err = reactQueryError(error);

      toast(err);
    }
  }, [userProfile?.data]);

  return {
    form,
    errors,
  };
};

export default useRegisterForm;
