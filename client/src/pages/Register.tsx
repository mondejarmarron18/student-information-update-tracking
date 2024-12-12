import RegisterForm from "@/components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <RegisterForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default Register;
