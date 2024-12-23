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

const StudentGuardianForm = (props: FormProps<StudentGuardianFormProps>) => {
  const { form } = useStudentGiardianForm();

  const onSubmit = (values: StudentGuardianFormProps) => {
    props.onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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

                {formField.type !== "select" ? (
                  <FormControl>
                    <Input placeholder={formField.placeholder} {...field} />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={formField.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formField.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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

        <Button type="submit" className="mt-4">
          {props.onSubmitLabel || "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default StudentGuardianForm;
