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
import { SignInFormProps } from "./schema";
import useSignInForm from "./useSignInForm";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";

const SignInForm = (props: FormProps<SignInFormProps>) => {
  const { form } = useSignInForm();

  const onSubmit = (values: SignInFormProps) => {
    props.onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={props.className}>
        {formFields.map((formField) => (
          <FormField
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input placeholder={formField.placeholder} {...field} />
                </FormControl>
                {!formField.hideError && <FormMessage />}
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="mt-4">
          {props.onSubmitLabel || (
            <>
              Continue <MdNavigateNext />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
