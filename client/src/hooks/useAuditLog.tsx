import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { IAuditLog } from "@/types/auditLog.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  auditLogId: string;
  enabled?: boolean;
};

const useAuditLog = (props?: Props) => {
  const { enabled = true, auditLogId } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<IAuditLog>>({
    queryKey: ["audit-logs", auditLogId],
    queryFn: async () => api.get(`/audit-logs/${auditLogId}`),
    enabled: enabled && !!auditLogId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useAuditLog;
