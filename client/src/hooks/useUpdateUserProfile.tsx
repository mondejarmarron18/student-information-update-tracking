import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { IUserProfile } from "./useUserProfile";

const useUpdateUserProfile = () => {
  const mutation = useMutation({
    mutationFn: (data: IUserProfile) => {
      return api.post<ApiResponseSuccess<IUserProfile>>("/update-requests", {
        contentType: "userProfileContent",
        content: data,
      });
    },
    onError: (error) => {
      const apiError = reactQueryError(error);

      if (apiError.status === 409) {
        return toast({
          variant: "destructive",
          title: "Pending Update Request",
          description:
            "You have a pending update request for your profile. Please wait for approval before making another request.",
        });
      }

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return mutation;
};

export default useUpdateUserProfile;
