import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/types/course.type";
import { CourseFormProps } from "@/components/forms/CourseForm/schema";

const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (data: CourseFormProps) => {
      return api.post<ApiResponseSuccess<Course>>("/courses", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useCreateCourse;
