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

type Props = {
  className?: string;
};

const SignInForm = (props: Props) => {
  const form = useSignInForm();

  const onSubmit = (values: SignInFormProps) => {
    console.log(values);
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
          Continue <MdNavigateNext />
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
