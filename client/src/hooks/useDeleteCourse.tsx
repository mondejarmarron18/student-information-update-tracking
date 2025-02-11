import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Course } from "@/types/course.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { toDateTimeString } from "@/utils/fomatter";

const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: (courseId: string) => {
      return api.delete<ApiResponseSuccess<Course>>(`/courses/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      toast({
        title: "Course Deleted",
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

export default useDeleteCourse;
