import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordFormProps } from "./schema";
import formFields from "./formFields";
import useForgotPasswordForm from "./useUpdatePasswordForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormProps } from "@/types/form.type";
import { Link } from "react-router";
import { routePaths } from "@/routes";
import AnimatedSpinner from "@/components/common/AnimatedSpinner";
import FormError from "@/components/common/FormError";

type Props = Omit<
  FormProps<ForgotPasswordFormProps>,
  "onCancel" | "onCancelLabel"
>;

const ForgotPasswordForm = (props: Props) => {
  const { form } = useForgotPasswordForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        <h1 className="text-xl font-semibold text-center">Forgot Password</h1>

        <p className="text-center text-sm text-gray-600">
          Enter your email address below, and we’ll send you a link to reset
          your password.
        </p>
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {props.error && <FormError {...props.error} />}
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={props.onSubmitLoading}
          >
            {props.onSubmitLoading ? (
              <>
                <AnimatedSpinner /> Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
          <Link
            to={routePaths.signIn.path}
            className="text-sm hover:underline self-center"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
