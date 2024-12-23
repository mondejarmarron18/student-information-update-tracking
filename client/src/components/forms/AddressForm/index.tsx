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
import formFields from "./formFields";
import { FormProps } from "@/types/form.type";
import { AddressFormProps } from "./schema";
import useAddressForm from "./useAddressForm";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useMemo } from "react";

const RegisterForm = (
  props: FormProps<Omit<AddressFormProps, "isAddressSame">>
) => {
  const { form } = useAddressForm();
  const isAddressSame = form.watch("isAddressSame");

  // set present address to permanent address
  useEffect(() => {
    if (isAddressSame) {
      form.setValue("present", form.getValues("permanent"));
    }
  }, [form, isAddressSame]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = ({ isAddressSame, ...values }: AddressFormProps) => {
    console.log(values);
    props.onSubmit(values);
  };

  const RenderFields = useMemo(() => {
    return ({ address }: { address: "permanent" | "present" }) => {
      return (
        <div className="grid grid-cols-2 gap-6">
          {formFields.map((formField) => {
            const fieldName = formField.name;

            if (!fieldName.includes(address)) return null;

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof AddressFormProps}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={formField.type}
                        placeholder={formField.placeholder}
                        {...field}
                        value={field.value.toString()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      );
    };
  }, [form.control]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", props.className)}
      >
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Permanent Address</h2>
          <RenderFields address="permanent" />
        </div>

        <FormField
          control={form.control}
          name="isAddressSame"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md p-4 bg-gray-500/10">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Present address is the same as permanent</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div
          className={cn("flex flex-col gap-6", {
            hidden: isAddressSame,
          })}
        >
          <h2 className="text-xl font-bold">Present Address</h2>
          <RenderFields address="present" />
        </div>

        <Button type="submit" className="mt-2">
          {props.onSubmitLabel || "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
