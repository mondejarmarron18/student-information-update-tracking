import { toast } from "@/hooks/use-toast";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAccountForm from "@/components/forms/UserAccountForm";
import { UserAccountFormProps } from "@/components/forms/UserAccountForm/schema";
import useCreateUserAccount from "@/hooks/useCreateUserAccount";

type Props = {
  trigger: ReactNode;
};

const UserAccountDialog = (props: Props) => {
  const { error, isPending, isSuccess, mutate } = useCreateUserAccount();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User Account Created",
        description: "Email verification link has been sent to user's email.",
      });

      setIsOpen(false);
    }
  }, [isSuccess]);

  const handleSave = (data: UserAccountFormProps) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User Account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <UserAccountForm
          className="overflow-y-auto max-h-[700px] p-1"
          onCancelLabel="Cancel"
          onCancel={() => setIsOpen(false)}
          onSubmitLabel={"Save"}
          onSubmitLoading={isPending}
          onSubmit={handleSave}
          error={error ? { description: error.description } : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserAccountDialog;
