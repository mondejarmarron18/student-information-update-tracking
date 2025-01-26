import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import useYearLevel from "@/hooks/useYearLevel";
import useCreateYearLevel from "@/hooks/useCreateYearLevel";
import YearLevelForm from "@/components/forms/YearLevelForm";
import useUpdateYearLevel from "@/hooks/useUpdateYearLevel";
import { YearLevelFormProps } from "@/components/forms/YearLevelForm/schema";

type Props = {
  yearLevelId?: string;
  trigger: ReactNode;
};

const YearLevelDialog = (props: Props) => {
  const { trigger } = props;
  const yearLevel = useYearLevel({ yearLevelId: props.yearLevelId || "" });
  const createYearLevel = useCreateYearLevel();
  const updateYearLevel = useUpdateYearLevel();
  const [isOpen, setIsOpen] = useState(false);

  const error = createYearLevel.error || updateYearLevel.error;

  useEffect(() => {
    if (createYearLevel.isSuccess || updateYearLevel.isSuccess) {
      toast({
        title: "Success",
        description: `Year level ${
          props.yearLevelId ? "updated" : "created"
        } successfully`,
      });
      setIsOpen(false);
    }

    return () => {
      createYearLevel.reset();
      updateYearLevel.reset();
    };
  }, [createYearLevel.isSuccess, updateYearLevel.isSuccess]);

  const onSubmit = (data: YearLevelFormProps) => {
    if (props.yearLevelId) {
      return updateYearLevel.mutate({
        ...data,
        yearLevelId: props.yearLevelId,
      });
    }

    createYearLevel.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {props.yearLevelId ? "Update" : "Create"} Year Level
          </DialogTitle>
          <DialogDescription>
            {props.yearLevelId
              ? "Update year level details"
              : "Create a new year level for your institution"}
          </DialogDescription>
        </DialogHeader>
        <YearLevelForm
          values={yearLevel.data?.data}
          error={error ? { description: error.description } : undefined}
          onCancel={() => setIsOpen(false)}
          onCancelLabel={"Cancel"}
          onSubmitLabel={props.yearLevelId ? "Update" : "Save"}
          onSubmit={onSubmit}
          onSubmitLoading={
            createYearLevel.isPending || updateYearLevel.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default YearLevelDialog;
