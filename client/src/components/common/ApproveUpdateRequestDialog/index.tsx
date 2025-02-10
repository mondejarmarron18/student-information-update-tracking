import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSpinner from "../AnimatedSpinner";
import useApproveUpdateRequest from "@/hooks/useApproveUpdateRequest";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";

type Props = {
  trigger: ReactNode;
  updateRequestId: string;
};

const formSchema = z.object({
  reviewComment: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ApproveUpdateRequestDialog = (props: Props) => {
  const { trigger, updateRequestId } = props;
  const { mutate, isPending, isSuccess, reset } = useApproveUpdateRequest({
    updateRequestId,
  });
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Update request has been approved.",
      });
      setIsOpen(false);
    }

    return () => {
      reset();
    };
  }, [isSuccess]);

  const onSubmit = (data: FormData) => {
    mutate(data.reviewComment);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Request?</DialogTitle>
          <DialogDescription>
            You can provide a reason or feedback for approving this request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="reviewComment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Comment/Feedback <i>(Optional)</i>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add your comment or feedback here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Note: Once approved, this action cannot be undone.
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="ghost" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? (
                  <>
                    <AnimatedSpinner /> Approving...
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveUpdateRequestDialog;
