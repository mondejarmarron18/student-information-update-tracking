import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { YearLevel } from "@/types/yearLevel.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateYearLevel = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: (data: Pick<YearLevel, "name" | "description">) => {
      return api.post<ApiResponseSuccess<YearLevel>>("/year-levels", data);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["year-levels"] }),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useCreateYearLevel;
