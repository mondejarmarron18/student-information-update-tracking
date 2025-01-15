import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { IUserProfile } from "./useUserProfile";
import useUpdateRequests from "./useUpdateRequests";
import useUpdateRequest from "./useUpdateRequest";

type Props = {
  updateRequestId: string;
};

const useRejectUpdateRequest = (props: Props) => {
  const { updateRequestId } = props;

  const updateRequests = useUpdateRequests({ enabled: false });
  const updateRequest = useUpdateRequest({ updateRequestId, enabled: false });

  const mutation = useMutation({
    mutationFn: (reviewComment: string) => {
      return api.post<ApiResponseSuccess<IUserProfile>>(
        `/update-requests/${updateRequestId}/reject`,
        {
          reviewComment,
        }
      );
    },
    onSuccess: () => {
      updateRequests.refetch();
      updateRequest.refetch();
    },
    onError: (error) => {
      const apiError = reactQueryError(error);

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return mutation;
};

export default useRejectUpdateRequest;
