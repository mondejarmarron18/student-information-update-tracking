import { Announcement } from "@/types/announement.type";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  enabled?: boolean;
};

const useAnnouncements = (props?: Props) => {
  const { enabled = true } = props || {};
  const { error, ...rest } = useQuery<ApiResponseSuccess<Announcement[]>>({
    queryKey: ["announcements"],
    queryFn: async () => api.get(`/announcements`),
    enabled: enabled,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useAnnouncements;
