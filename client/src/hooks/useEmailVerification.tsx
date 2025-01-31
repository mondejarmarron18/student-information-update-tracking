import { ApiResponseSuccess } from "@/types/apiResponse.type";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useEmailVerification = (verificationCode: string) => {
  const emailVerificationMutation = useQuery({
    queryKey: ["email-verification", verificationCode],
    queryFn: () => {
      return api.get<Omit<ApiResponseSuccess, "accessToken">>(
        `/users/email-verification/${verificationCode}`
      );
    },
    enabled: !!verificationCode,
  });

  return emailVerificationMutation;
};

export default useEmailVerification;
