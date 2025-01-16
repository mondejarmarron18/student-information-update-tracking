import { UpdatePasswordFormProps } from "@/components/forms/UpdatePasswordForm/schema";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";

const useUpdatePassword = () => {
  const { error, ...rest } = useMutation({
    mutationFn: (data: Omit<UpdatePasswordFormProps, "confirmPassword">) => {
      return api.patch("/users/me/password", data);
    },
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdatePassword;
