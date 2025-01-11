import { useEffect } from "react";
import { UserProfileFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type IUserProfileValues = {
  values?: Omit<UserProfileFormProps, "isAddressSame">;
  form: UseFormReturn<UserProfileFormProps>;
};

const useUserProfileValues = (props: IUserProfileValues) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(key as keyof UserProfileFormProps, value as string);
      });
    }
  }, [props.values]);
};

export default useUserProfileValues;
