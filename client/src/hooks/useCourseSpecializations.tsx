import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Course } from "@/types/course.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  courseId: string;
  enabled?: boolean;
};

const useCourseSpecializations = (props: Props) => {
  const { enabled = true, courseId } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Course[]>>({
    queryKey: ["course-specializations", courseId],
    queryFn: async () => api.get(`/courses/${props?.courseId}/specializations`),
    enabled: enabled && !!courseId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useCourseSpecializations;
