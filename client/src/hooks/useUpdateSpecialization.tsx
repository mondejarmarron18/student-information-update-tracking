import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Specialization } from "@/types/specialization.type";
import { SpecializationFormProps } from "@/components/forms/SpecializationForm/schema";

const useUpdateSpecialization = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (
      data: SpecializationFormProps & { specializationId: string }
    ) => {
      return api.put<ApiResponseSuccess<Specialization>>(
        `/specializations/${data.specializationId}`,
        {
          courseId: data.courseId,
          name: data.name,
          description: data.description,
          details: data.details,
        }
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["specializations"] }),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useUpdateSpecialization;
