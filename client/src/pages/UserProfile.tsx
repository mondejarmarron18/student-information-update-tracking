import AddressForm from "@/components/forms/AddressForm";
import UserProfileForm from "@/components/forms/UserProfileForm";
import { toast } from "@/hooks/use-toast";
import useRegisterUserProfile from "@/hooks/useRegisterUserProfile";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import useUserProfile, { IUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { data, error, isSuccess } = useUserProfile();
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>();
  const [formIndex, setFormIndex] = useState(0);
  const registerUserProfile = useRegisterUserProfile();
  const updateUserProfile = useUpdateUserProfile();

  useEffect(() => {
    if (data) {
      setUserProfile(data.data);
    }
    if (error) if (error && error?.status !== 404) toast(error);
  }, [data, error]);

  useEffect(() => {
    let message: string = "";

    if (registerUserProfile.isSuccess) {
      message = "Your personal information has been saved.";
    }

    if (updateUserProfile.isSuccess) {
      message =
        "Your update request has been submitted and is pending approval.";
    }

    if (message) {
      toast({
        title: "Personal Profile",
        description: message,
      });
    }
  }, [registerUserProfile.isSuccess, updateUserProfile.isSuccess]);

  const handleSave = (data: IUserProfile) => {
    if (isSuccess) {
      return updateUserProfile.mutate(data);
    }

    return registerUserProfile.mutate(data);
  };

  return (
    <div className="flex h-full flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <UserProfileForm
          onSubmitLabel="Next"
          values={userProfile}
          onSubmit={(val) => {
            setUserProfile(val as IUserProfile);
            setFormIndex((prev) => prev + 1);
          }}
          className={cn({
            hidden: formIndex !== 0,
          })}
        />
        <AddressForm
          values={userProfile?.address}
          onCancelLabel="Previous"
          onCancel={() => setFormIndex((prev) => prev - 1)}
          onSubmitLabel={isSuccess ? "Update" : "Save"}
          onSubmitLoading={registerUserProfile.isPending}
          onSubmit={(val) => {
            handleSave({ ...userProfile, address: val } as IUserProfile);
          }}
          className={cn({
            hidden: formIndex !== 1,
          })}
        />
      </div>
    </div>
  );
};

export default UserProfile;
