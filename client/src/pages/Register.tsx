import RegisterForm from "@/components/forms/RegisterForm";
import { RegisterFormProps } from "@/components/forms/RegisterForm/schema";
import useRegisterUser from "@/hooks/useRegisterUser";

const Register = () => {
  const registerUser = useRegisterUser();

  const handleRegisterUser = (data: RegisterFormProps) => {
    const { email, password } = data;

    registerUser.mutate({ email, password });
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <RegisterForm
          onSubmit={handleRegisterUser}
          onSubmitLoading={registerUser.isPending}
        />
      </div>
    </div>
  );
};

export default Register;
