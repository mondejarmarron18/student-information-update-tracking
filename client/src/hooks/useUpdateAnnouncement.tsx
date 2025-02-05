import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Announcement } from "@/types/announement.type";
import { AnnouncementFormProps } from "@/components/forms/AnnouncementForm/schema";
import _ from "lodash";

const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (
      params: AnnouncementFormProps & { announcementId: string }
    ) => {
      return api.put<ApiResponseSuccess<Announcement>>(
        `/announcements/${params.announcementId}`,
        {
          data: _.omit(params, "announcementId"),
        }
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });

  const queryError = error ? reactQueryError(error) : null;

  return {
    ...mutation,
    error: queryError,
  };
};

export default useUpdateAnnouncement;
