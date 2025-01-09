import { useMutation } from "@tanstack/react-query";
import useAccessToken from "./useAccessToken";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { UserAccount } from "@/types/user.type";

const useLogin = () => {
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
  });

  return loginMutation;
};

export default useLogin;
