import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Course } from "@/types/course.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  courseId: string;
  enabled?: boolean;
};

const useCourse = (props: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Course>>({
    queryKey: ["courses", props.courseId],
    queryFn: async () => api.get(`/courses/${props.courseId}`),
    enabled: enabled && !!props.courseId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useCourse;
