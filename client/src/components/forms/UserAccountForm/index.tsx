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
import { UserAccountFormProps } from "./schema";
import useUserAccountForm from "./useUserAccountForm";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import FormError from "@/components/common/FormError";
import SelectRole from "@/components/common/SelectRole";
const RegisterForm = (props: FormProps<UserAccountFormProps>) => {
  const { form } = useUserAccountForm();

  const onSubmit = (values: UserAccountFormProps) => {
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
                {formField.name === "roledId" ? (
                  <SelectRole
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                ) : (
                  <FormControl>
                    <Input
                      type={formField.type}
                      placeholder={formField.placeholder}
                      {...field}
                    />
                  </FormControl>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Password will be auto-generated and sent to the
          user's email address. For better security, we recommend resetting
          password after logging in to something that can easily remember.
        </p>

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

          <Button type="submit" className="flex-1">
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

export default RegisterForm;
