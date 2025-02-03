import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAccountFormProps } from "@/components/forms/UserAccountForm/schema";

const useCreateUserAccount = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: ({ email, roleId, password }: UserAccountFormProps) => {
      return api.post<Omit<ApiResponseSuccess, "accessToken">>("/users", {
        roleId,
        email,
        password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
    },
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useCreateUserAccount;
