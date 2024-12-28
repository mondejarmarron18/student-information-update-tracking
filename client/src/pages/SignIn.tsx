import SignInForm from "@/components/forms/SignInForm";
import { reset, setUser } from "@/features/users/useSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const SignIn = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const dispath = useAppDispatch();

  const handleSetUser = () => {
    dispath(setUser({ id: "1", email: "test" }));
  };

  const handleResetUser = () => {
    dispath(reset());
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      {user.email}
      <button onClick={handleSetUser}>Add</button>
      <button onClick={handleResetUser}>Reset</button>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">SignIn</h1>
        <SignInForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default SignIn;
