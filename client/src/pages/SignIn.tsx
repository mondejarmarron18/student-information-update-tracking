import SignInForm from "@/components/forms/SignInForm";
import useLogin from "@/hooks/useLogin";
import { routePaths } from "@/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isPending } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      navigate(routePaths.userProfile);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">SignIn</h1>
        <SignInForm onSubmit={mutate} onSubmitLoading={isPending} />
      </div>
    </div>
  );
};

export default SignIn;
