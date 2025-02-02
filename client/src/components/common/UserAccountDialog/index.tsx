import { toast } from "@/hooks/use-toast";
import useRegisterUserProfile from "@/hooks/useRegisterUserProfile";
import useUpdateUserProfile, {
  contentType,
} from "@/hooks/useCreateUpdateRequest";
import useUserProfile, { IUserProfile } from "@/hooks/useUserProfile";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAccountForm from "@/components/forms/UserAccountForm";
import { UserAccount } from "@/types/user.type";

type Props = {
  trigger: ReactNode;
};

const UserAccountDialog = (props: Props) => {
  const { data, error, isSuccess } = useUserProfile();
  const registerUserProfile = useRegisterUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      //   setUserProfile(data.data);
    }
    if (error) if (error && error?.status !== 404) toast(error);
  }, [data, error]);

  useEffect(() => {
    if (registerUserProfile.isSuccess) {
      toast({
        title: "User Account Created",
        description: "Email verification link has been sent to their email.",
      });

      setIsOpen(false);
    }
  }, [registerUserProfile.isSuccess]);

  const handleSave = (data: UserAccount) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-full max-w-md overflow-y-auto max-h-[700px] p-1">
          <UserAccountForm
            onCancelLabel="Cancel"
            onCancel={() => setIsOpen(false)}
            onSubmitLabel={isSuccess ? "Submit" : "Save"}
            onSubmitLoading={registerUserProfile.isPending}
            onSubmit={handleSave}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserAccountDialog;
