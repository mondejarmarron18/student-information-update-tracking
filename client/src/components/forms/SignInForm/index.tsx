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
import { SignInFormProps } from "./schema";
import useSignInForm from "./useSignInForm";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

const SignInForm = (props: FormProps<SignInFormProps>) => {
  const { form } = useSignInForm();
  const navigate = useNavigate();

  console.log(form.watch());

  const onSubmit = (values: SignInFormProps) => {
    props.onSubmit(values);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: form.watch("email") } });
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
                <div className="flex w-full justify-between items-center">
                  <FormLabel>{formField.label}</FormLabel>
                  {formField.name === "password" && (
                    <Button
                      onClick={handleForgotPassword}
                      variant="link"
                      type="button"
                      className="dark:text-white text-black"
                    >
                      Forgot your password?
                    </Button>
                  )}
                </div>
                <FormControl>
                  <Input placeholder={formField.placeholder} {...field} />
                </FormControl>
                {!formField.hideError && <FormMessage />}
              </FormItem>
            )}
          />
        ))}

        <div className="flex flex-col gap-6">
          <Button className="w-full">{props.onSubmitLabel || "Login"}</Button>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button type="button" variant="outline" className="w-full">
            <IoLogoGoogle /> Login with Google
          </Button> */}
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
