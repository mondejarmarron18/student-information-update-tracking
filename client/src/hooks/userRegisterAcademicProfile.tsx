import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

import { IAcademicProfile } from "@/types/academicProfile.type";

const useRegisterAcademicProfile = () => {
  const mutation = useMutation({
    mutationFn: (data: IAcademicProfile) => {
      return api.post<ApiResponseSuccess<IAcademicProfile>>(
        "/academic-profiles",
        data
      );
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

export default useRegisterAcademicProfile;
