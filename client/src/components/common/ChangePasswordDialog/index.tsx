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
import { toast } from "@/hooks/use-toast";
import { toDateTimeString } from "@/utils/fomatter";

type Props = {
  trigger: ReactNode;
};

const ChangePasswordDialog = (props: Props) => {
  const { trigger } = props;
  const { mutate, isPending, isSuccess, error } = useUpdatePassword();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Password Updated",
        description: toDateTimeString(new Date()),
      });
      setIsOpen(false);
    }
  }, [isSuccess]);

  const onSubmit = (data: UpdatePasswordFormProps) => {
    mutate(_.omit(data, "confirmPassword"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Secure your account by updating your password below.
          </DialogDescription>
        </DialogHeader>
        <UpdatePasswordForm
          error={error ? { description: error.description } : undefined}
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

export default ChangePasswordDialog;
