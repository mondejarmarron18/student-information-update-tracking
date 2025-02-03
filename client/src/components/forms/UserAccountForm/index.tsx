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
import { ControllerRenderProps } from "react-hook-form";
import generateRandomPassword from "@/utils/generateRandomPassword";
import { LiaRandomSolid } from "react-icons/lia";
import PasswordValidator from "@/components/common/PasswordValidator";
import { BsCopy } from "react-icons/bs";
import { toast } from "@/hooks/use-toast";

const RegisterForm = (props: FormProps<UserAccountFormProps>) => {
  const { form } = useUserAccountForm();

  const onSubmit = (values: UserAccountFormProps) => {
    props.onSubmit(values);
  };

  const generatePassword = () => {
    const password = generateRandomPassword();
    form.setValue("password", password);
  };

  const copy = () => {
    navigator.clipboard.writeText(form.getValues("password"));

    toast({
      description: "Password copied to clipboard",
    });
  };

  const renderFied = (
    formField: (typeof formFields)[number],
    field: ControllerRenderProps<UserAccountFormProps>
  ) => {
    if (formField.name === "roleId")
      return <SelectRole value={field.value} onValueChange={field.onChange} />;

    if (formField.name === "password")
      return (
        <FormControl>
          <>
            <div className="flex gap-2 items-center">
              <div className="flex-1 flex items-center relative">
                <Input
                  type={formField.type}
                  placeholder={formField.placeholder}
                  {...field}
                />
                <BsCopy
                  onClick={copy}
                  className="absolute right-3 hover:cursor-pointer hover:text-primary"
                  size={18}
                  title="Copy Password"
                />
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="flex gap-1 p-2 items-center hover:text-primary text-sm font-semibold"
                title="Generate Random Password"
              >
                <LiaRandomSolid /> Generate
              </button>
            </div>{" "}
            <PasswordValidator password={field.value} />
          </>
        </FormControl>
      );

    return (
      <FormControl>
        <Input
          type={formField.type}
          placeholder={formField.placeholder}
          {...field}
        />
      </FormControl>
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
                {renderFied(formField, field)}

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <p className="text-sm text-muted-foreground">
          Please advise the user to reset their password after email
          verification in order to set a new, memorable password.
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
