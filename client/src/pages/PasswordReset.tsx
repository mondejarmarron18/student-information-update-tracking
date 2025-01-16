import PasswordResetForm from "@/components/forms/PasswordResetForm";
import { PasswordResetFormProps } from "@/components/forms/PasswordResetForm/schema";
import { useParams } from "react-router";

const PasswordReset = () => {
  const { verificationCode } = useParams();

  const handleResetPassword = (data: PasswordResetFormProps) => {
    console.log({
      ...data,
      verificationCode,
    });
  };

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen p-4">
      <PasswordResetForm
        className="w-full max-w-md border border-gray-500/30 shadow-md rounded-lg px-6 py-10"
        onSubmit={handleResetPassword}
      />
    </div>
  );
};

export default PasswordReset;
