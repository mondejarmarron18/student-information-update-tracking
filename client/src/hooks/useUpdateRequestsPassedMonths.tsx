import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { UpdateRequestsPassedMonths } from "@/types/updateRequest.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  months: number;
  enabled?: boolean;
};

const useUpdateRequestsPassedMonths = (props?: Props) => {
  const { enabled = true, months } = props || {};

  const { error, ...rest } = useQuery<
    ApiResponseSuccess<UpdateRequestsPassedMonths>
  >({
    queryKey: ["update-requests", "passed-months", months],
    queryFn: async () =>
      api.get("/update-requests/passed-months", { params: { months } }),
    enabled: enabled && !!months,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdateRequestsPassedMonths;
