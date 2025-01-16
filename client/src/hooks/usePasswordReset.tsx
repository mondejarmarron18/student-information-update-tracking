import { PasswordResetFormProps } from "@/components/forms/PasswordResetForm/schema";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";

const usePasswordReset = () => {
  const { error, ...rest } = useMutation({
    mutationFn: (
      data: Omit<PasswordResetFormProps, "confirmPassword"> & {
        verificationCode: string;
      }
    ) => {
      return api.patch("/users/reset-password", data);
    },
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default usePasswordReset;
