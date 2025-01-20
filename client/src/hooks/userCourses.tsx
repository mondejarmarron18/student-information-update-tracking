import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Course } from "@/types/course.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useCourses = (props?: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Course[]>>({
    queryKey: ["courses"],
    queryFn: async () => api.get("/courses"),
    enabled: enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useCourses;
