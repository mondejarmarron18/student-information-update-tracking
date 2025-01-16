import { useEffect, useState } from "react";
import { Link } from "react-router";
import { routePaths } from "@/routes";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { ForgotPasswordFormProps } from "@/components/forms/ForgotPasswordForm/schema";
import useForgotPassword from "@/hooks/useForgotPassword";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isSuccess, mutate, error, isPending } = useForgotPassword();
  const [timer, setTimer] = useState(30); // Countdown starts at 60 seconds

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup interval on unmount
    };
  }, [timer]);

  const handleSubmit = (data: ForgotPasswordFormProps) => {
    setEmail(data.email);
    mutate(data.email);
  };

  const handleResubmit = () => {
    mutate(email);
    setTimer(30);
  };

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md border border-gray-500/30 space-y-6 shadow-md rounded-lg px-6 py-10">
        {isSuccess ? (
          <div className="text-center flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold">Check Your Email</h1>
              <p>
                We sent a password reset link to: <strong>{email}</strong>
              </p>
              <p>
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            </div>
            <Button onClick={handleResubmit} disabled={timer > 0}>
              {timer > 0 ? `Resend Link (${timer}s)` : "Resend Link"}
            </Button>
            <Link
              to={routePaths.signIn.path}
              className="text-sm hover:underline self-center text-primary"
            >
              Back to Sign In
            </Link>
          </div>
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
