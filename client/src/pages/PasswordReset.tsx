import PasswordResetForm from "@/components/forms/PasswordResetForm";
import { PasswordResetFormProps } from "@/components/forms/PasswordResetForm/schema";
import usePasswordReset from "@/hooks/usePasswordReset";
import { routePaths } from "@/routes";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { verificationCode } = useParams();
  const { mutate, isPending, error, isSuccess } = usePasswordReset();

  useEffect(() => {
    if (isSuccess) {
      navigate(routePaths.signIn.path);
    }
  }, [isSuccess, navigate]);

  const handleResetPassword = (data: PasswordResetFormProps) => {
    mutate({
      password: data.password,
      verificationCode: verificationCode || "",
    });
  };

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen p-4">
      <PasswordResetForm
        className="w-full max-w-md border border-gray-500/30 shadow-md rounded-lg px-6 py-10"
        onSubmitLoading={isPending}
        onSubmit={handleResetPassword}
        error={error ? { description: error.description } : undefined}
      />
    </div>
  );
};

export default PasswordReset;
