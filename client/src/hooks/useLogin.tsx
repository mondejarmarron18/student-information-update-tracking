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

  const loginMutation = useMutation({
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

      console.error(error);

      if (apiError.status === 422) {
        return navigate(routePaths.emailVerificationSent);
      }

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return loginMutation;
};

export default useLogin;
