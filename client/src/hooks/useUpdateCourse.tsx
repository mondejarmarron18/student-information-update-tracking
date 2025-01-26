import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/types/course.type";
import { CourseFormProps } from "@/components/forms/CourseForm/schema";

const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (data: CourseFormProps & { courseId: string }) => {
      return api.put<ApiResponseSuccess<Course>>(`/courses/${data.courseId}`, {
        name: data.name,
        description: data.description,
        details: data.details,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useUpdateCourse;
