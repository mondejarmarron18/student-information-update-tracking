import { useState } from "react";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { ForgotPasswordFormProps } from "@/components/forms/ForgotPasswordForm/schema";
import useForgotPassword from "@/hooks/useForgotPassword";
import ForgotPasswordSent from "@/components/common/ForgotPasswordSent";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { mutateAsync, mutate, error, isPending } = useForgotPassword();

  const handleSubmit = async (data: ForgotPasswordFormProps) => {
    const res = await mutateAsync(data.email);

    if (res.status === 200) {
      setEmail(data.email);
    }
  };

  const handleResubmit = () => mutate(email);

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md border border-gray-500/30 space-y-6 shadow-md rounded-lg px-6 py-10">
        {email ? (
          <ForgotPasswordSent
            email={email}
            onResubmit={handleResubmit}
            onResubmitLoading={isPending}
            error={isPending ? error?.description : undefined}
          />
        ) : (
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            onSubmitLoading={isPending}
            error={
              error?.description
                ? { description: error.description }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
