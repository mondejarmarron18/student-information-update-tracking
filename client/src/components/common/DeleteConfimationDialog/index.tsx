import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import AnimatedSpinner from "../AnimatedSpinner";

type Props = {
  title?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  content?: ReactNode;
  description?: string;
  trigger: ReactNode;
  isCompleted?: boolean;
};
const DeleteConfirmationDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.isCompleted) {
      setIsOpen(false);
    }
  }, [props.isCompleted]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title || "Delete Action"}</DialogTitle>
          <DialogDescription>
            {props.description ||
              "This action will delete the record. Please check and verify before proceeding. Do you still want to continue?"}
          </DialogDescription>
        </DialogHeader>
        {props.content && (
          <div className="bg-destructive/20 p-4 text-sm rounded-md flex flex-col gap-4">
            <div className="font-semibold text-red-500">
              Record to be Deleted
            </div>
            <div className="text-gray-300">{props.content}</div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{props.cancelLabel || "No, cancel"}</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={props.onConfirm}
            disabled={props.isLoading}
          >
            {props.isLoading ? (
              <AnimatedSpinner />
            ) : (
              props.confirmLabel || "Yes, proceed"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
