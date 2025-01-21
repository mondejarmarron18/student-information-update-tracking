import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { Course } from "@/types/course.type";

const useCreateCourse = () => {
  const { error, ...mutation } = useMutation({
    mutationFn: (data: Pick<Course, "name" | "description">) => {
      return api.post<ApiResponseSuccess<Course>>("/courses", data);
    },
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useCreateCourse;
