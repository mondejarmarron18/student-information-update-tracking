import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpecializationFormProps } from "@/components/forms/SpecializationForm/schema";
import { Specialization } from "@/types/specialization.type";

const useCreateSpecialization = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (data: SpecializationFormProps) => {
      return api.post<ApiResponseSuccess<Specialization>>(
        "/specializations",
        data
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

export default useCreateSpecialization;
