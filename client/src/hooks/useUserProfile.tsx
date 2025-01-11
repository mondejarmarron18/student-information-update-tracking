import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = () => {
  const { error, ...rest } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => api.get("/user-profiles/me"),
  });

  const handleError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handleError,
  };
};

export default useUserProfile;
