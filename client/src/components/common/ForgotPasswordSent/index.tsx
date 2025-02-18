import { Button } from "@/components/ui/button";
import { routePaths } from "@/routes";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import AnimatedSpinner from "../AnimatedSpinner";
import FormError from "../FormError";

type ForgotPasswordSentProps = {
  email: string;
  onResubmit: () => void;
  resubmitTimer?: number;
  onResubmitLoading?: boolean;
  error?: string;
};

const ForgotPasswordSent: FC<ForgotPasswordSentProps> = ({
  email,
  onResubmit,
  onResubmitLoading,
  resubmitTimer = 30,
  error,
}) => {
  const [timer, setTimer] = useState(resubmitTimer); // Countdown starts at 60 seconds

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

  const handleOnResubmit = () => {
    setTimer(resubmitTimer);
    onResubmit();
  };

  return (
    <div className="text-center flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Check Your Email</h1>
        <p>
          We sent a password reset link to: <strong>{email}</strong>
        </p>
        <p>
          Please check your inbox and follow the instructions to reset your
          password.
        </p>
      </div>
      {error && <FormError description={error} />}
      <Button
        onClick={handleOnResubmit}
        disabled={timer > 0 || onResubmitLoading}
      >
        {onResubmitLoading ? (
          <>
            <AnimatedSpinner /> Resending...
          </>
        ) : timer > 0 ? (
          `Resend Link (${timer}s)`
        ) : (
          "Resend Link"
        )}
      </Button>
      <Link
        to={routePaths.signIn.path}
        className="text-sm hover:underline self-center text-primary"
      >
        Back to Sign In
      </Link>
    </div>
  );
};

export default ForgotPasswordSent;
