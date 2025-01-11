import AddressForm from "@/components/forms/AddressForm";
import UserProfileForm from "@/components/forms/UserProfileForm";
import { UserProfileFormProps } from "@/components/forms/UserProfileForm/schema";
import { useState } from "react";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileFormProps>();
  const [formIndex, setFormIndex] = useState(0);

  const handleOnSubmitUserProfile = (data: UserProfileFormProps) => {
    setUserProfile(data);
    setFormIndex(1);
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">UserProfile</h1>

        {formIndex === 0 && (
          <UserProfileForm
            values={userProfile}
            onSubmitLabel="Next"
            onSubmit={handleOnSubmitUserProfile}
          />
        )}
        {formIndex === 1 && (
          <AddressForm
            onCancelLabel="Previous"
            onCancel={() => setFormIndex(formIndex - 1)}
            onSubmitLabel="Save"
            onSubmit={(val) => console.log(val)}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
