import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { UpdateRequestsPassedDays } from "@/types/updateRequest.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  days: number;
  enabled?: boolean;
};

const useUpdateRequestsPassedDays = (props?: Props) => {
  const { enabled = true, days } = props || {};

  const { error, ...rest } = useQuery<
    ApiResponseSuccess<UpdateRequestsPassedDays>
  >({
    queryKey: ["update-requests", "passed-days", days],
    queryFn: async () =>
      api.get("/update-requests/passed-days", { params: { days } }),
    enabled: enabled && !!days,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdateRequestsPassedDays;
