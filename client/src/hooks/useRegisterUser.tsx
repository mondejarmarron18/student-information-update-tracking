import { routePaths } from "@/routes";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "./use-toast";
import { RegisterFormProps } from "@/components/forms/RegisterForm/schema";

const useRegisterUser = () => {
  const navigate = useNavigate();

  const registerUserMutation = useMutation({
    mutationFn: ({
      email,
      password,
      captcha,
    }: Omit<RegisterFormProps, "confirmPassword">) => {
      return api.post<Omit<ApiResponseSuccess, "accessToken">>(
        "/users/register",
        {
          email,
          password,
        },
        {
          headers: {
            "X-Captcha-Token": captcha,
          },
        }
      );
    },
    onSuccess: () => navigate(routePaths.emailVerificationSent.path),
    onError: (error) => {
      const apiError = reactQueryError(error);

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
