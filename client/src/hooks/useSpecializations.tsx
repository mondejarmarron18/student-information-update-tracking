import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Specialization } from "@/types/specialization.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  courseId?: string;
  enabled?: boolean;
};

const useSpecializations = (props?: Props) => {
  const { enabled = true, courseId } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Specialization[]>>({
    queryKey: ["specializations", courseId],
    queryFn: async () => api.get(`/specializations`, { params: { courseId } }),
    enabled: enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useSpecializations;
