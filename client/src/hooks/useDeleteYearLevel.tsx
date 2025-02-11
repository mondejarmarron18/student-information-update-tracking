import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { toDateTimeString } from "@/utils/fomatter";
import { YearLevel } from "@/types/yearLevel.type";

const useDeleteYearLevel = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: (yearLevelId: string) => {
      return api.delete<ApiResponseSuccess<YearLevel>>(
        `/year-levels/${yearLevelId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["year-levels"] });

      toast({
        title: "Year Level Deleted",
        description: toDateTimeString(new Date()),
      });
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

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useDeleteYearLevel;
