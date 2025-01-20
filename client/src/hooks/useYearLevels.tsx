import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { YearLevel } from "@/types/yearLevel.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useYearLevels = (props?: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<YearLevel[]>>({
    queryKey: ["year-levels"],
    queryFn: async () => api.get(`/year-levels`),
    enabled: enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useYearLevels;
