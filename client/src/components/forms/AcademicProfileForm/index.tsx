import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AcademicProfileFormProps } from "./schema";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import useAcademicProfileForm from "./useAcademicProfileForm";
import useAcademicProfileValues from "./useAcaemicProfileValues";
import SelectCourseSpecialization from "@/components/common/SelectCourseSpecialization";
import SelectCourse from "@/components/common/SelectCourse";
import { ControllerRenderProps } from "react-hook-form";
import { useEffect } from "react";
import SelectYearLevel from "@/components/common/SelectYearLevel";

const AcademicProfileForm = (props: FormProps<AcademicProfileFormProps>) => {
  const { form } = useAcademicProfileForm();
  const courseId = form.watch("courseId");

  useAcademicProfileValues({
    values: props.values,
    form,
  });

  useEffect(() => {
    form.resetField("specializationId");
  }, [courseId]);

  const onSubmit = (values: AcademicProfileFormProps) => {
    props.onSubmit(values);
  };

  const renderSelect = (
    formField: (typeof formFields)[number],
    field: ControllerRenderProps<AcademicProfileFormProps>
  ) => {
    if (formField.name === "courseId")
      return (
        <SelectCourse
          placeholder={formField.placeholder}
          value={field.value as string}
          onValueChange={field.onChange}
        />
      );

    if (formField.name === "specializationId")
      return (
        <SelectCourseSpecialization
          courseId={courseId}
          placeholder={formField.placeholder}
          value={field.value as string}
          onValueChange={field.onChange}
        />
      );

    return (
      <SelectYearLevel
        placeholder={formField.placeholder}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
      />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        <h2 className="text-xl font-semibold">Student Information</h2>
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>

                {formField.type === "select" ? (
                  renderSelect(formField, field)
                ) : (
                  <FormControl>
                    <Input placeholder={formField.placeholder} {...field} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="mt-2 flex gap-2">
          {props.onCancelLabel && (
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={props.onCancel}
            >
              {props.onCancelLabel}
            </Button>
          )}

          <Button type="submit" className="flex-1">
            {props.onSubmitLabel || "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AcademicProfileForm;
