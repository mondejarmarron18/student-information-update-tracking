import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Announcement } from "@/types/announement.type";
import { AnnouncementFormProps } from "@/components/forms/AnnouncementForm/schema";

const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  const { error, ...mutation } = useMutation({
    mutationFn: (data: AnnouncementFormProps) => {
      return api.post<ApiResponseSuccess<Announcement>>("/announcements", data);
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

export default useCreateAnnouncement;
