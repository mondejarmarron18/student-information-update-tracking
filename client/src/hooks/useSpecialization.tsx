import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Specialization } from "@/types/specialization.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  specializationId: string;
  enabled?: boolean;
};

const useSpecialization = (props: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Specialization>>({
    queryKey: ["specializations", props.specializationId],
    queryFn: async () => api.get(`/specializations/${props.specializationId}`),
    enabled: enabled && !!props.specializationId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useSpecialization;
