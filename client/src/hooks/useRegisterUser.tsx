import { routePaths } from "@/routes";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { UserAccount } from "@/types/user.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "./use-toast";

const useRegisterUser = () => {
  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: (data: Pick<UserAccount, "email" | "password">) => {
      return api.post<Omit<ApiResponseSuccess, "accessToken">>(
        "/users/register",
        data
      );
    },
    onSuccess: () => navigate(routePaths.emailVerificationSent),
    onError: (error) => {
      const apiError = reactQueryError(error);

      console.error(apiError);

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return registerUserMutation;
};

export default useRegisterUser;
