import { apiWithoutInterceptors } from "@/utils/api";
import cookie from "@/utils/cookie";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExportAuditLogs = () => {
  const queryClient = useQueryClient();
  const { error, ...rest } = useMutation({
    mutationFn: async () =>
      apiWithoutInterceptors.get("/audit-logs/download", {
        headers: {
          Authorization: `Bearer ${cookie.accessToken.get()}`,
        },
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] }),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useExportAuditLogs;
