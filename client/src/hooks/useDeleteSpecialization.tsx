import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Course } from "@/types/course.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { toDateTimeString } from "@/utils/fomatter";

const useDeleteSpecialization = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: (specializationId: string) => {
      return api.delete<ApiResponseSuccess<Course>>(
        `/specializations/${specializationId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });

      toast({
        title: "Specialization Deleted",
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

export default useDeleteSpecialization;
