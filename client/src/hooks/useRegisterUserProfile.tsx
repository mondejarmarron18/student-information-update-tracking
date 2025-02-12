import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { IUserProfile } from "./useUserProfile";

const useRegisterUserProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: IUserProfile) => {
      return api.post<ApiResponseSuccess<IUserProfile>>("/user-profiles", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      const apiError = reactQueryError(error);

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return mutation;
};

export default useRegisterUserProfile;
