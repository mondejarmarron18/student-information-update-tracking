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
import { MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";
import PasswordValidator from "@/components/common/PasswordValidator";
import { isValidPassword } from "@/utils/validator";
import { RegisterFormProps } from "./schema";
import useRegisterForm from "./useRegisterForm";
import { useState } from "react";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";

const RegisterForm = (props: FormProps<RegisterFormProps>) => {
  const { form } = useRegisterForm();
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onSubmit = (values: RegisterFormProps) => {
    const isPasswordMatch = values.password === values.confirmPassword;
    const isValidPass = isValidPassword(values.password);

    if (!isValidPass || !isPasswordMatch) {
      return setPasswordError("Invalid password");
    }

    props.onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-2", props.className)}
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

        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <Button type="submit" className="mt-2">
          {props.onSubmitLabel || (
            <>
              Next <MdNavigateNext />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
