import SignInForm from "@/components/forms/SignInForm";
import { SignInFormProps } from "@/components/forms/SignInForm/schema";
import { routePaths } from "@/Routes";
import api from "@/utils/api";
import cookie from "@/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: (data: SignInFormProps) => api.post("/users/login", data),
  });

  useEffect(() => {
    const accessToken = cookie.accessToken.get();

    if (accessToken) {
      navigate(routePaths.userProfile);
    }
  }, [isSuccess, navigate]);

  const handleLogin = async (data: SignInFormProps) => {
    const { data: accessToken } = await mutateAsync(data);

    if (accessToken) {
      cookie.accessToken.set(accessToken);
    }
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">SignIn</h1>
        <SignInForm onSubmit={handleLogin} onSubmitLoading={isPending} />
      </div>
    </div>
  );
};

export default SignIn;
