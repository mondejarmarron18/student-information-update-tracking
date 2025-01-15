import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { IUpdateRequest } from "@/types/updateRequest.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  updateRequestId: string;
  enabled?: boolean;
};

const useUpdateRequest = (props: Props) => {
  const { updateRequestId, enabled = true } = props;

  const { error, ...rest } = useQuery<ApiResponseSuccess<IUpdateRequest>>({
    queryKey: ["update-request", updateRequestId],
    queryFn: async () => api.get(`/update-requests/${updateRequestId}`),
    enabled: enabled && !!updateRequestId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUpdateRequest;
