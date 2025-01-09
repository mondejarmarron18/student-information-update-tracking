import { routePaths } from "@/routes";
import { RiMailSendLine } from "react-icons/ri";
import { Link } from "react-router";

const EmailVerificationSent = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center">
      <div className="bg-primary/10 p-8 rounded-full mb-4">
        <RiMailSendLine className="w-14 h-14 text-primary" />
      </div>
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Email verification sent
        </h1>
        <p className="opacity-70 mb-2 p-2 md:p-4">
          Check your email to continue the registration process
        </p>
        <Link to={routePaths.signIn} className="text-primary">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
