import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import useAccessToken from "./useAccessToken";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { reactQueryError } from "@/utils/errorHandler";

const useLogout = () => {
  const { removeAccessToken } = useAccessToken();

  const logoutMutation = useMutation({
    mutationFn: () => api.post<ApiResponseSuccess>("/users/logout"),
    onSuccess: () => {
      removeAccessToken();
    },
    onError: (error) => {
      const apiError = reactQueryError(error);

      console.error(apiError);
      removeAccessToken();
    },
  });

  return logoutMutation;
};

export default useLogout;
