import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import defaultValues from "./defaultValues";
import formSchema, { AddressFormProps } from "./schema";
import useUserProfile from "@/hooks/useUserProfile";
import { useEffect } from "react";
import { reactQueryError } from "@/utils/errorHandler";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const useAddressForm = () => {
  const form = useForm<AddressFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const errors = form.formState.errors;
  const { data: userProfile, error } = useUserProfile();

  useEffect(() => {
    const data = userProfile?.data.address;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        form.setValue(
          key as keyof AddressFormProps,
          value as AddressFormProps["permanent"]
        );
      });
    }

    if (error instanceof AxiosError) {
      const err = reactQueryError(error);

      toast(err);
    }
  }, [userProfile?.data.address]);

  return {
    form,
    errors,
  };
};

export default useAddressForm;
