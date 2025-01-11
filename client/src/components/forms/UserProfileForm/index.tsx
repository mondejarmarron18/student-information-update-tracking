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
import { useMemo } from "react";
import DatePicker from "@/components/common/DatePicker";

const UserProfileForm = (props: FormProps<UserProfileFormProps>) => {
  const { form } = useUserProfileForm();

  const onSubmit = (values: UserProfileFormProps) => {
    props.onSubmit(values);
  };

  const RenderFields = useMemo(() => {
    return formFields.map((formField) => (
      <FormField
        key={formField.name}
        control={form.control}
        name={formField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex gap-1">
              <span>{formField.label}</span>
              <span className="opacity-50 italic">
                {formField.optional && "(Optional)"}
              </span>
            </FormLabel>
            <FormControl>
              {formField.type === "radio" ? (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
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
              ) : formField.type === "date" ? (
                <DatePicker
                  onSelect={field.onChange}
                  className="w-full"
                  value={field.value as Date}
                />
              ) : (
                <Input
                  type={formField.type}
                  placeholder={formField.placeholder}
                  {...field}
                  value={field.value as string}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  }, [form.control]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        {RenderFields}
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
            {props.onSubmitLabel || "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
