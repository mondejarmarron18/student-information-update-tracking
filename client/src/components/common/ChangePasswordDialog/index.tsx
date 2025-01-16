import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import { UpdatePasswordFormProps } from "@/components/forms/UpdatePasswordForm/schema";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import _ from "lodash";
import useLogout from "@/hooks/useLogout";
import { toast } from "@/hooks/use-toast";

type Props = {
  trigger: ReactNode;
};

const RejectUpdateRequestDialog = (props: Props) => {
  const { mutate: logout } = useLogout();
  const { trigger } = props;
  const { mutate, isPending, isSuccess, error, isIdle } = useUpdatePassword();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && !isIdle) {
      logout();
    }

    if (error && !isIdle) {
      console.log(error);
      toast({
        title: error?.message,
        description: error?.description,
        variant: "destructive",
      });
    }
  }, [error, isIdle, isSuccess, logout]);

  const onSubmit = (data: UpdatePasswordFormProps) => {
    mutate(_.omit(data, "confirmPassword"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            You'll be logged out once saved and asked to log in again.
          </DialogDescription>
        </DialogHeader>
        <UpdatePasswordForm
          onCancelLabel="Cancel"
          onCancel={() => setIsOpen(false)}
          onSubmitLabel="Save Changes"
          onSubmit={onSubmit}
          onSubmitLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RejectUpdateRequestDialog;
