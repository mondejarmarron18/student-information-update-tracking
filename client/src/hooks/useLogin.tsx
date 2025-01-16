import { useMutation } from "@tanstack/react-query";
import useAccessToken from "./useAccessToken";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { UserAccount } from "@/types/user.type";
import { useNavigate } from "react-router";
import { routePaths } from "@/routes";
import { useToast } from "./use-toast";
import { reactQueryError } from "@/utils/errorHandler";

const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAccessToken } = useAccessToken();

  const { error, ...rest } = useMutation({
    mutationFn: (data: Pick<UserAccount, "email" | "password">) => {
      return api.post<ApiResponseSuccess>("/users/login", data);
    },
    onSuccess: (data) => {
      const accessToken = `${data.data}`;

      if (!accessToken) {
        throw new Error("Login failed");
      }

      setAccessToken(accessToken);
    },
    onError: (error) => {
      const apiError = reactQueryError(error);

      if (apiError.status === 401) return;

      if (apiError.status === 422) {
        return navigate(routePaths.emailVerificationSent.path);
      }

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  const handledError = error ? reactQueryError(error) : null;

  return { ...rest, error: handledError };
};

export default useLogin;
