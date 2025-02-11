import { useEffect } from "react";
import { SpecializationFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type Props = {
  values?: SpecializationFormProps;
  form: UseFormReturn<SpecializationFormProps>;
};

const useCourseValues = (props: Props) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof SpecializationFormProps,
          value as unknown as string
        );
      });
    }
  }, [props.values]);
};

export default useCourseValues;
