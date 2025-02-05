import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { IUserProfile } from "./useUserProfile";

type Props = {
  updateRequestId: string;
};

const useRejectUpdateRequest = (props: Props) => {
  const { updateRequestId } = props;
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["update-requests"] });
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
