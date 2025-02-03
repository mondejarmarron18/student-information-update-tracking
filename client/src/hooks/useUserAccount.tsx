import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { UserAccount } from "@/types/user.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

type Props = {
  userAccountId: string;
  enabled?: boolean;
};

const useUserAccount = (props?: Props) => {
  const { enabled = true, userAccountId } = props || {};

  const { error, ...rest } = useQuery<ApiResponseSuccess<UserAccount>>({
    queryKey: ["user-accounts", userAccountId],
    queryFn: async () => api.get(`/users/${userAccountId}`),
    enabled: enabled && !!userAccountId,
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUserAccount;
