import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { IUpdateRequest } from "@/types/updateRequest.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

const useUpdateRequests = () => {
  const { error, ...rest } = useQuery<ApiResponseSuccess<IUpdateRequest[]>>({
    queryKey: ["update-requests"],
    queryFn: async () => api.get("/update-requests"),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdateRequests;
