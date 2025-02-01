import { ApiResponseSuccess } from "@/types/apiResponse.type";
import { UserAccount } from "@/types/user.type";
import api from "@/utils/api";
import { reactQueryError } from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

const useUserAccounts = () => {
  const { error, ...rest } = useQuery<ApiResponseSuccess<UserAccount[]>>({
    queryKey: ["user-accounts"],
    queryFn: async () => api.get("/users"),
  });

  const handledError = error ? reactQueryError(error) : null;

  return {
    ...rest,
    error: handledError,
  };
};

export default useUserAccounts;
