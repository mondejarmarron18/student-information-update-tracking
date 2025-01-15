import { apiWithoutInterceptors } from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";

const useExportAuditLogs = () => {
  const { error, ...rest } = useMutation({
    mutationFn: async () => apiWithoutInterceptors.get("/audit-logs/download"),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useExportAuditLogs;
