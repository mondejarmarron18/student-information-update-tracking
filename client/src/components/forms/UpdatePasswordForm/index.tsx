import PasswordValidator from "@/components/common/PasswordValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdatePasswordFormProps } from "./schema";
import formFields from "./formFields";
import useStudentGiardianForm from "./useUpdatePasswordForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/types/form.type";

const UpdatePasswordForm = (props: FormProps<UpdatePasswordFormProps>) => {
  const { form } = useStudentGiardianForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {formField.name === "newPassword" && (
                  <PasswordValidator password={field.value} />
                )}
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

export default UpdatePasswordForm;
