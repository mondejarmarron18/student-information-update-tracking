import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { Role } from "@/types/role.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useRoles = (props?: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<Role[]>>({
    queryKey: ["roles"],
    queryFn: async () => api.get(`/roles`),
    enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useRoles;
