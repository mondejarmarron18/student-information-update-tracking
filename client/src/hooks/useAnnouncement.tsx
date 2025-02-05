import { Announcement } from "@/types/announement.type";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  announcementId?: string;
  enabled?: boolean;
};

const useAnnouncement = (props?: Props) => {
  const { enabled = true } = props || {};
  const { error, ...rest } = useQuery<ApiResponseSuccess<Announcement>>({
    queryKey: ["announcements", props?.announcementId],
    queryFn: async () => api.get(`/announcements/${props?.announcementId}`),
    enabled: enabled && !!props?.announcementId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useAnnouncement;
