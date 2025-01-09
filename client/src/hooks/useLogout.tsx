import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import useAccessToken from "./useAccessToken";
import { ApiResponseError, ApiResponseSuccess } from "@/types/apiResponse.type";

const useLogout = () => {
  const { removeAccessToken } = useAccessToken();

  const logoutMutation = useMutation({
    mutationFn: () => api.post<ApiResponseSuccess>("/users/logout"),
    onSuccess: () => {
      removeAccessToken();
    },
    onError: (error: ApiResponseError) => {
      console.log("Logout failed:", error);
      removeAccessToken();
    },
  });

  return logoutMutation;
};

export default useLogout;
