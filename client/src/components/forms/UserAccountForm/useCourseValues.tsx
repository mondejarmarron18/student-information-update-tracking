import { useEffect } from "react";
import { YearLevelFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type Props = {
  values?: YearLevelFormProps;
  form: UseFormReturn<YearLevelFormProps>;
};

const useCourseValues = (props: Props) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof YearLevelFormProps,
          value as unknown as string
        );
      });
    }
  }, [props.values]);
};

export default useCourseValues;
