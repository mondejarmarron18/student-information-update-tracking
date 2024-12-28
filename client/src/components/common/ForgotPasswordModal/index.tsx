import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {};

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform your password reset logic here, e.g., API call
    setSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Forgot Password?</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            {submitted ? (
              <p>
                We sent a password reset link to: <strong>{email}</strong>
                <br />
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            ) : (
              "Enter your email address to receive a password reset link."
            )}
          </DialogDescription>
        </DialogHeader>
        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button>Send Reset Link</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
