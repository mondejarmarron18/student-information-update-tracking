import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { routePaths } from "@/routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform your password reset logic here, e.g., API call
    setSubmitted(true);
  };

  return (
    <div className="flex  flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md border border-gray-500/30 space-y-6 shadow-md rounded-lg px-6 py-10">
        {submitted ? (
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
            <Link
              to={routePaths.signIn.path}
              className="text-sm hover:underline self-center text-primary"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-center">
              Forgot Password
            </h1>

            <p className="text-center text-sm text-gray-600">
              Enter your email address below, and we’ll send you a link to reset
              your password.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
              <Link
                to={routePaths.signIn.path}
                className="text-sm hover:underline self-center"
              >
                Back to Sign In
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
