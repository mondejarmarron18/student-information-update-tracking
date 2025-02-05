import { useEffect } from "react";
import { AnnouncementFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type Props = {
  values?: AnnouncementFormProps;
  form: UseFormReturn<AnnouncementFormProps>;
};

const useAnnouncementValues = (props: Props) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof AnnouncementFormProps,
          value as unknown as string
        );
      });
    }
  }, [props.values]);
};

export default useAnnouncementValues;
