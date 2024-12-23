import UserProfileForm from "@/components/forms/UserProfileForm";

const UserProfile = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">UserProfile</h1>
        <UserProfileForm onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};

export default UserProfile;
