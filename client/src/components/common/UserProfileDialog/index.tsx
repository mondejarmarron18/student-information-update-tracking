import AddressForm from "@/components/forms/AddressForm";
import UserProfileForm from "@/components/forms/UserProfileForm";
import { toast } from "@/hooks/use-toast";
import useRegisterUserProfile from "@/hooks/useRegisterUserProfile";
import useUpdateUserProfile, {
  contentType,
} from "@/hooks/useCreateUpdateRequest";
import useUserProfile, { IUserProfile } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  trigger: ReactNode;
};

const UserProfileDialog = (props: Props) => {
  const { data, error, isSuccess } = useUserProfile();
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>();
  const [formIndex, setFormIndex] = useState(0);
  const registerUserProfile = useRegisterUserProfile();
  const updateUserProfile = useUpdateUserProfile({
    contentType: contentType.userProfileContent,
  });
  const [isOpen, setIsOpen] = useState(false);

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

      setIsOpen(false);
    }
  }, [registerUserProfile.isSuccess, updateUserProfile.isSuccess]);

  const handleSave = (data: IUserProfile) => {
    if (isSuccess) {
      return updateUserProfile.mutate(data);
    }

    return registerUserProfile.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-md overflow-y-auto max-h-[700px] p-1">
          <UserProfileForm
            onSubmitLabel="Proceed to Address"
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
            onSubmitLabel={isSuccess ? "Submit for Approval" : "Save Changes"}
            onSubmitLoading={
              registerUserProfile.isPending || updateUserProfile.isPending
            }
            onSubmit={(val) => {
              handleSave({ ...userProfile, address: val } as IUserProfile);
            }}
            className={cn({
              hidden: formIndex !== 1,
            })}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
