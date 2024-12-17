import SignInForm from "@/components/forms/SignInForm";

const SignIn = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">SignIn</h1>
        <SignInForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default SignIn;
