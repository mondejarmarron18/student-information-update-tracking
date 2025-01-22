import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import CourseForm from "@/components/forms/CourseForm";
import { CourseFormProps } from "@/components/forms/CourseForm/schema";
import useCreateCourse from "@/hooks/useCreateCourse";
import { toast } from "@/hooks/use-toast";
import useUpdateCourse from "@/hooks/useUpdateCourse";

type Props = {
  courseId?: string;
  trigger: ReactNode;
};

const CourseDialog = (props: Props) => {
  const { trigger } = props;
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (createCourse.isSuccess || updateCourse.isSuccess) {
      toast({
        title: "Success",
        description: `Course ${
          props.courseId ? "updated" : "created"
        } successfully`,
      });
      setIsOpen(false);
    }

    return () => {
      createCourse.reset();
      updateCourse.reset();
    };
  }, [createCourse.isSuccess, updateCourse.isSuccess]);

  const onSubmit = (data: CourseFormProps) => {
    if (props.courseId) {
      return updateCourse.mutate({
        ...data,
        courseId: props.courseId,
      });
    }

    createCourse.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {props.courseId ? "Update" : "Create"} Course
          </DialogTitle>
          <DialogDescription>
            {props.courseId
              ? "Update course details"
              : "Create a new course for your institution"}
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          error={
            createCourse.error
              ? { description: createCourse.error.description }
              : undefined
          }
          onCancel={() => setIsOpen(false)}
          onCancelLabel={"Cancel"}
          onSubmitLabel={props.courseId ? "Update" : "Save"}
          onSubmit={onSubmit}
          onSubmitLoading={createCourse.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog;
