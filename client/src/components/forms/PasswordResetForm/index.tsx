import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordResetFormProps } from "./schema";
import formFields from "./formFields";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/types/form.type";
import { Link } from "react-router";
import { routePaths } from "@/routes";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import FormError from "@/components/common/FormError";
import usePasswordResetForm from "./useUpdatePasswordForm";
import PasswordValidator from "@/components/common/PasswordValidator";

type Props = Omit<
  FormProps<PasswordResetFormProps>,
  "onCancel" | "onCancelLabel"
>;

const PasswordResetForm = (props: Props) => {
  const { form } = usePasswordResetForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Password Reset</h2>
          <p className="text-sm text-gray-600">
            After successfully resetting your password, you will be redirected
            to the Sign In page.
          </p>
        </div>
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
                {formField.name === "password" && (
                  <PasswordValidator password={field.value} />
                )}
              </FormItem>
            )}
          />
        ))}
        {props.error && <FormError {...props.error} />}
        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            {props.onSubmitLoading ? (
              <>
                <AnimatedSpinner /> Resetting Password...
              </>
            ) : (
              "Confirm Password Reset"
            )}
          </Button>
          <Link
            to={routePaths.forgotPassword.path}
            className="text-sm hover:underline self-center"
          >
            Request New Reset Link
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default PasswordResetForm;
