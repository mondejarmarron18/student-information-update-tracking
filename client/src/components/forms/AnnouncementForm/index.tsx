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
import { AnnouncementFormProps } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/common/FormError";
import RichText from "@/components/common/RichText";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAnnouncementValues from "./useAnnouncementValues";
import useAnnouncementForm from "./useAnnouncementForm";

const AnnouncementForm = (props: FormProps<AnnouncementFormProps>) => {
  const { form } = useAnnouncementForm();

  useAnnouncementValues({
    values: props.values,
    form,
  });

  const onSubmit = (data: AnnouncementFormProps) => {
    props.onSubmit(data);
  };

  const renderField = (
    formField: (typeof formFields)[number],
    field: ControllerRenderProps<AnnouncementFormProps>
  ) => {
    if (formField.type === "richtext") {
      return (
        <RichText
          value={field.value}
          onChange={field.onChange}
          placeholder={formField.placeholder}
        />
      );
    }

    if (formField.type === "textarea") {
      return <Textarea placeholder={formField.placeholder} {...field} />;
    }

    if (formField.type === "select") {
      return (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={formField.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {formField.options.map((option) => (
              <SelectItem key={option.value} value={option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type={formField.type}
        placeholder={formField.placeholder}
        {...field}
      />
    );
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
                <FormControl>{renderField(formField, field)}</FormControl>

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

          <Button
            disabled={props.onSubmitLoading}
            type="submit"
            className="flex-1"
          >
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

export default AnnouncementForm;
