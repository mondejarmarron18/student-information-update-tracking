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
import PasswordValidator from "@/components/common/PasswordValidator";
import { RegisterFormProps } from "./schema";
import useRegisterForm from "./useRegisterForm";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import { AiOutlineLoading } from "react-icons/ai";

const RegisterForm = (props: FormProps<RegisterFormProps>) => {
  const { form } = useRegisterForm();

  const onSubmit = (values: RegisterFormProps) => {
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
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {formField.name === "password" && (
                  <PasswordValidator password={form.watch("password")} />
                )}
              </FormItem>
            )}
          />
        ))}

        <div className="flex flex-col gap-6">
          <Button className="w-full">
            {props.onSubmitLoading ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              props.onSubmitLabel || "Register"
            )}
          </Button>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or sign-up with
            </span>
          </div>
          <Button type="button" variant="outline" className="w-full">
            <IoLogoGoogle /> Sign-up with Google
          </Button> */}
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/" className="underline underline-offset-4">
            {}
            Login
          </a>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
