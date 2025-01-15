import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { IAuditLog } from "@/types/auditLog.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useAuditLogs = (props?: Props) => {
  const { enabled = true } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<IAuditLog[]>>({
    queryKey: ["audit-logs"],
    queryFn: async () => api.get("/audit-logs"),
    enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useAuditLogs;
