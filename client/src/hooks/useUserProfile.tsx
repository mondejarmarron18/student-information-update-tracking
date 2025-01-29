import { AddressFormProps } from "@/components/forms/AddressForm/schema";
import { UserProfileFormProps } from "@/components/forms/UserProfileForm/schema";
import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

export type IUserProfile = UserProfileFormProps & {
  address: Omit<AddressFormProps, "isAddressSame">;
};

const useUserProfile = () => {
  const { error, ...rest } = useQuery<ApiResponseSuccess<IUserProfile>>({
    queryKey: ["user-profile"],
    queryFn: async () => api.get("/user-profiles/me"),
    retry: 1,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUserProfile;
