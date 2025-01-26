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
import SpecializationForm from "@/components/forms/SpecializationForm";
import useCreateSpecialization from "@/hooks/useCreateSpecialization";
import { SpecializationFormProps } from "@/components/forms/SpecializationForm/schema";
import useSpecialization from "@/hooks/useSpecialization";
import useUpdateSpecialization from "@/hooks/useUpdateSpecialization";

type Props = {
  specializationId?: string;
  trigger: ReactNode;
};

const SpecializationDialog = (props: Props) => {
  const { trigger } = props;
  const specialization = useSpecialization({
    specializationId: props.specializationId || "",
  });
  const createSpecialization = useCreateSpecialization();
  const updateSpecialization = useUpdateSpecialization();
  const [isOpen, setIsOpen] = useState(false);

  const error = createSpecialization.error || updateSpecialization.error;

  useEffect(() => {
    if (createSpecialization.isSuccess || updateSpecialization.isSuccess) {
      toast({
        title: "Success",
        description: `Specialization ${
          props.specializationId ? "updated" : "created"
        } successfully`,
      });
      setIsOpen(false);
    }

    return () => {
      createSpecialization.reset();
      updateSpecialization.reset();
    };
  }, [createSpecialization.isSuccess, updateSpecialization.isSuccess]);

  const onSubmit = (data: SpecializationFormProps) => {
    if (props.specializationId) {
      return updateSpecialization.mutate({
        ...data,
        specializationId: props.specializationId,
      });
    }

    createSpecialization.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {props.specializationId ? "Update" : "Create"} Specialization
          </DialogTitle>
          <DialogDescription>
            {props.specializationId
              ? "Update specialization details"
              : "Create a new specialization for your institution"}
          </DialogDescription>
        </DialogHeader>

        <SpecializationForm
          values={specialization.data?.data}
          error={error ? { description: error.description } : undefined}
          onCancel={() => setIsOpen(false)}
          onCancelLabel={"Cancel"}
          onSubmitLabel={props.specializationId ? "Update" : "Save"}
          onSubmit={onSubmit}
          onSubmitLoading={
            createSpecialization.isPending || updateSpecialization.isPending
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default SpecializationDialog;
