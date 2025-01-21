import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import CourseForm from "@/components/forms/CourseForm";
import { CourseFormProps } from "@/components/forms/CourseForm/schema";
import useCreateCourse from "@/hooks/useCreateCourse";

type Props = {
  trigger: ReactNode;
};

const CourseDialog = (props: Props) => {
  const { trigger } = props;
  const { mutate, isPending, error } = useCreateCourse();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: CourseFormProps) => {
    mutate(data);
  };

  console.log(error);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription className="text-red-500">
            Once a course is created, it cannot be deleted by users. Only
            administrators have the ability to delete courses.
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          error={error ? { description: error.description } : undefined}
          onCancel={() => setIsOpen(false)}
          onCancelLabel={"Cancel"}
          onSubmitLabel={"Save"}
          onSubmit={onSubmit}
          onSubmitLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
