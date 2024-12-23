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
import { UserProfileFormProps } from "./schema";
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import useUserProfileForm from "./useUserProfileForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UserProfileForm = (props: FormProps<UserProfileFormProps>) => {
  const { form } = useUserProfileForm();

  const onSubmit = (values: UserProfileFormProps) => {
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
                  {formField.type !== "radio" ? (
                    <Input
                      type={formField.type}
                      placeholder={formField.placeholder}
                      {...field}
                    />
                  ) : (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-4"
                    >
                      {formField.options.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-1 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="mt-2">
          {props.onSubmitLabel || "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileForm;
