import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { IUserProfile } from "./useUserProfile";
import useUpdateRequests from "./useUpdateRequests";
import { IAcademicProfile } from "@/types/academicProfile.type";

export const contentType = {
  userProfileContent: "userProfileContent",
  acadProfileContent: "acadProfileContent",
} as const;

type ContentTypeMap = {
  [contentType.acadProfileContent]: IAcademicProfile;
  [contentType.userProfileContent]: IUserProfile;
};

type Props = {
  contentType: keyof typeof contentType;
};

const useCreateUpdateRequest = (props: Props) => {
  const { refetch } = useUpdateRequests();
  const mutation = useMutation({
    mutationFn: (data: ContentTypeMap[typeof props.contentType]) => {
      return api.post<
        ApiResponseSuccess<ContentTypeMap[typeof props.contentType]>
      >("/update-requests", {
        contentType: props.contentType,
        content: data,
      });
    },
    onSuccess: () => refetch(),
    onError: (error) => {
      const apiError = reactQueryError(error);

      if (apiError.status === 409) {
        return toast({
          variant: "destructive",
          title: "Pending Update Request",
          description:
            "You have a pending update request for your profile. Please wait for approval before making another request.",
        });
      }

      toast({
        variant: "destructive",
        title: apiError.message,
        description: apiError.description,
      });
    },
  });

  return mutation;
};

export default useCreateUpdateRequest;
