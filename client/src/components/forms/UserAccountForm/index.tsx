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
import { cn } from "@/lib/utils";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import { YearLevelFormProps } from "./schema";
import useYearLevelForm from "./useYearLevelForm";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/common/FormError";
import RichText from "@/components/common/RichText";
import useCourseValues from "./useCourseValues";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";

const YearLevelForm = (props: FormProps<YearLevelFormProps>) => {
  const { form } = useYearLevelForm();

  useCourseValues({
    values: props.values,
    form,
  });

  const onSubmit = (data: YearLevelFormProps) => {
    props.onSubmit(data);
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
                <FormControl>
                  {formField.type === "textarea" ? (
                    <Textarea placeholder={formField.placeholder} {...field} />
                  ) : formField.type === "richtext" ? (
                    <RichText
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={formField.placeholder}
                    />
                  ) : (
                    <Input
                      type={formField.type}
                      placeholder={formField.placeholder}
                      {...field}
                    />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {!!props.error && <FormError {...props.error} />}

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

          <Button disabled={props.onSubmitLoading} type="submit" className="flex-1">
            {props.onSubmitLoading ? (
              <AnimatedSpinner />
            ) : (
              props.onSubmitLabel || "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default YearLevelForm;
