import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StudentGuardianFormProps } from "./schema";
import useStudentGiardianForm from "./useStudentGiardianForm";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import useStudentGuardianValues from "./useStudentGuardianValues";

const StudentGuardianForm = (props: FormProps<StudentGuardianFormProps>) => {
  const { form } = useStudentGiardianForm();

  useStudentGuardianValues({
    values: props.values,
    form,
  });

  const onSubmit = (values: StudentGuardianFormProps) => {
    props.onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        <h2 className="text-xl font-semibold">Student Guardian</h2>
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>

                {formField.type !== "select" ? (
                  <FormControl>
                    <Input placeholder={formField.placeholder} {...field} />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={formField.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formField.options.map((option) => (
                        <SelectItem
                          key={`${option.value}`}
                          value={`${option.value}`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {!formField.hideError && <FormMessage />}
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

export default StudentGuardianForm;
