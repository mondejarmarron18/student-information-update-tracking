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

type Props = {
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FieldNames = keyof typeof formSchema._type;

const formFields: {
  name: FieldNames;
  label: string;
  type: "email" | "password";
  placeholder: string;
}[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@phinmaed.com",
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const errors = form.formState.errors;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="mt-2">
          Next <MdNavigateNext />
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
