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
import { MdInfoOutline } from "react-icons/md";
import Tooltip from "@/components/common/Tooltip";

const UserProfileForm = (props: FormProps<UserProfileFormProps>) => {
  const { form } = useUserProfileForm();

  const onSubmit = (values: UserProfileFormProps) => {
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
                <FormLabel className="flex gap-1">
                  <span>{formField.label}</span>
                  <span className="opacity-50">
                    {formField.optional && "(optional)"}
                  </span>
                </FormLabel>
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
                      className="flex items-center gap-6"
                    >
                      {formField.options.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal gap-[1px] flex items-center">
                            <span>{option.label}</span>

                            {option.tooltip && (
                              <Tooltip
                                content={option.tooltip}
                                trigger={
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-fit p-1 h-fit rounded-full"
                                  >
                                    <MdInfoOutline className="opacity-60" />
                                  </Button>
                                }
                              />
                            )}
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
