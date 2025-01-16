import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";

const useForgotPassword = () => {
  const { error, ...rest } = useMutation({
    mutationFn: (email: string) => {
      return api.post("/users/forgot-password", {
        email,
      });
    },
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useForgotPassword;
