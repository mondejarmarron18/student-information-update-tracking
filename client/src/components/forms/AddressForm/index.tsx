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
import { Textarea } from "@/components/ui/textarea";
import _ from "lodash";

type AddressKey = keyof Omit<AddressFormProps, "isAddressSame">;

const RegisterForm = (
  props: FormProps<Omit<AddressFormProps, "isAddressSame">>
) => {
  const { form } = useAddressForm();
  const isAddressSame = form.watch("isAddressSame");

  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        form.setValue(
          key as keyof AddressFormProps,
          value as AddressFormProps["permanent"]
        );
      });
    }
  }, [props.values]);

  // set present address to permanent address
  useEffect(() => {
    if (isAddressSame) {
      form.setValue("current", form.getValues("permanent"));
    }
  }, [form, isAddressSame]);

  const onSubmit = (data: AddressFormProps) => {
    props.onSubmit(_.omit(data, "isAddressSame"));
  };

  const RenderFields = useMemo(() => {
    return ({ address }: { address: AddressKey }) => (
      <div className="grid grid-cols-2 gap-6">
        {formFields.map((formField) => {
          const fieldName = formField.name;

          if (!fieldName.includes(address)) return null;

          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as AddressKey}
              render={({ field }) => (
                <FormItem
                  className={cn("", {
                    "col-span-2": formField.type === "textarea",
                  })}
                >
                  <FormLabel>
                    {formField.label}{" "}
                    <span className="opacity-50 italic">
                      {formField.optional && "(Optional)"}
                    </span>
                  </FormLabel>
                  <FormControl>
                    {formField.type === "textarea" ? (
                      <Textarea
                        placeholder={formField.placeholder}
                        {...field}
                        value={field.value.toString()}
                      />
                    ) : (
                      <Input
                        type={formField.type}
                        placeholder={formField.placeholder}
                        {...field}
                        value={field.value.toString()}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </div>
    );
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
                <FormLabel>Current address is the same as permanent</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div
          className={cn("flex flex-col gap-6", {
            hidden: isAddressSame,
          })}
        >
          <h2 className="text-xl font-bold">Current Address</h2>
          <RenderFields address="current" />
        </div>

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

export default RegisterForm;
