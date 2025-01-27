import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { YearLevel } from "@/types/yearLevel.type";
import { YearLevelFormProps } from "@/components/forms/YearLevelForm/schema";

const useUpdateYearLevel = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (data: YearLevelFormProps & { yearLevelId: string }) => {
      return api.put<ApiResponseSuccess<YearLevel>>(
        `/year-levels/${data.yearLevelId}`,
        {
          name: data.name,
          description: data.description,
        }
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["year-levels"] }),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useUpdateYearLevel;
