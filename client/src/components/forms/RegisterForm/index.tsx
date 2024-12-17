import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdNavigateNext } from "react-icons/md";
import { cn } from "@/lib/utils";
import PasswordValidator from "@/components/common/PasswordValidator";
import { allowedLength, isValidPassword } from "@/utils/validator";
import { useState } from "react";

type Props = {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(allowedLength, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FieldNames = z.infer<typeof formSchema>;

const formFields: {
  name: keyof FieldNames;
  label: string;
  type: "email" | "password";
  placeholder: string;
}[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jude.cruz.au@phinmaed.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
  },
];

const RegisterForm = (props: Props) => {
  const form = useForm<FieldNames>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [passswordError, setPasswordError] = useState<string | null>(null);
  const errors = form.formState.errors;

  const onSubmit = (values: FieldNames) => {
    const isPasswordMatch = values.password === values.confirmPassword;
    const isValidPass = isValidPassword(values.password);

    if (!isValidPass || !isPasswordMatch) {
      return setPasswordError("Invalid password");
    }

    console.log(values);
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
                    className={cn({
                      "border-red-500": errors[formField.name],
                    })}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errors[formField.name] && errors[formField.name]?.message}
                </FormMessage>
                {formField.name === "password" && (
                  <PasswordValidator password={form.watch("password")} />
                )}
              </FormItem>
            )}
          />
        ))}

        {passswordError && <p className="text-red-500">{passswordError}</p>}
        <Button type="submit" className="mt-2">
          Next <MdNavigateNext />
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
