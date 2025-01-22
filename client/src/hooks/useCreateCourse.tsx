import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { Course } from "@/types/course.type";
import { CourseFormProps } from "@/components/forms/CourseForm/schema";
import useCourses from "./useCourses";

const useCreateCourse = () => {
  const courses = useCourses({ enabled: false });
  const { error, ...mutation } = useMutation({
    mutationFn: (data: CourseFormProps) => {
      return api.post<ApiResponseSuccess<Course>>("/courses", data);
    },
    onSuccess: () => courses.refetch(),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useCreateCourse;
