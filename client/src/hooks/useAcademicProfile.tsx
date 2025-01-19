import { IAcademicProfile } from "@/types/academicProfile.type";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

const useAcademicProfile = () => {
  const { error, ...rest } = useQuery<ApiResponseSuccess<IAcademicProfile>>({
    queryKey: ["academic-profile"],
    queryFn: async () => api.get("/academic-profiles/me"),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useAcademicProfile;
