import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { IUpdateRequest } from "@/types/updateRequest.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useUpdateRequests = (props?: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<IUpdateRequest[]>>({
    queryKey: ["update-requests"],
    queryFn: async () => api.get("/update-requests"),
    enabled: enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdateRequests;
