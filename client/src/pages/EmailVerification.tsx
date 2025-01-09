import { Button } from "@/components/ui/button";
import useEmailVerification from "@/hooks/useEmailVerification";
import { cn } from "@/lib/utils";
import { routePaths } from "@/routes";
import {
  BsFillSendCheckFill,
  BsFillSendExclamationFill,
  BsFillSendArrowUpFill,
} from "react-icons/bs";
import { Link, useParams } from "react-router";

const EmailVerification = () => {
  const { verificationCode } = useParams();
  const { isSuccess, isPending, isError } = useEmailVerification(
    verificationCode || ""
  );

  const renderIcon = () => {
    if (isPending)
      return (
        <BsFillSendArrowUpFill className="w-10 h-10 md:w-14 md:h-14 text-orange-500 animate-pulse" />
      );

    if (isSuccess)
      return (
        <BsFillSendCheckFill className="w-10 h-10 md:w-14 md:h-14 text-primary" />
      );

    return (
      <BsFillSendExclamationFill className="w-10 h-10 md:w-14 md:h-14 text-red-500" />
    );
  };

  const renderTitle = () => {
    if (isPending) return "Verifying...";

    if (isSuccess) return "Congratulations! 🎉";

    return "Oops! Something went wrong. 😞";
  };

  const renderDescription = () => {
    if (isPending) return "Please wait while we verify your email.";

    if (isSuccess)
      return "Your email has been successfully verified. You can now access your account.";

    return "It seems that your verification link has either expired or is invalid. Don't worry, we can help you with that.";
  };

  const renderInstruction = () => {
    if (isPending)
      return "This may take a few moments. Thank you for your patience.";

    if (isSuccess) return "Ready to get started?";

    return "Please try signing in again, and a new verification email will be sent to you.";
  };

  return (
    <div
      className={cn(
        "p-2 md:p-4 flex flex-col justify-center items-center h-full text-center"
      )}
    >
      <div
        className={cn("bg-primary/10 p-7 md:p-10 rounded-full mb-4", {
          "bg-red-500/10": isError,
          "bg-orange-500/10 animate-pulse": isPending,
        })}
      >
        {renderIcon()}
      </div>
      <div>
        <h1 className={"text-xl md:text-2xl lg:text-3xl font-bold"}>
          {renderTitle()}
        </h1>
        <p className="text-sm md:text-base opacity-70 mb-4">
          {renderDescription()}
        </p>
        <p className="text-sm md:text-base mb-6">{renderInstruction()}</p>
        {!isPending && (
          <Link to={routePaths.signIn}>
            <Button variant={isSuccess ? "default" : "secondary"}>
              Go to Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
