import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { YearLevel } from "@/types/yearLevel.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  yearLevelId?: string;
  enabled?: boolean;
};

const useYearLevel = (props?: Props) => {
  const { enabled = true } = props || {};
  const { error, ...rest } = useQuery<ApiResponseSuccess<YearLevel>>({
    queryKey: ["year-levels", props?.yearLevelId],
    queryFn: async () => api.get(`/year-levels/${props?.yearLevelId}`),
    enabled: enabled && !!props?.yearLevelId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useYearLevel;
