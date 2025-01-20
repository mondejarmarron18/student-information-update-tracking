import { useEffect } from "react";
import { AcademicProfileFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type IAcademicProfileValues = {
  values?: AcademicProfileFormProps;
  form: UseFormReturn<AcademicProfileFormProps>;
};

const useAcademicProfileValues = (props: IAcademicProfileValues) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof AcademicProfileFormProps,
          value as string
        );
      });
    }
  }, [props.values]);
};

export default useAcademicProfileValues;
