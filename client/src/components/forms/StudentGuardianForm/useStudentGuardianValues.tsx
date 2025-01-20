import { useEffect } from "react";
import { StudentGuardianFormProps } from "./schema";
import { UseFormReturn } from "react-hook-form";

type IStudentGuardianValues = {
  values?: StudentGuardianFormProps;
  form: UseFormReturn<StudentGuardianFormProps>;
};

const useStudentGuardianValues = (props: IStudentGuardianValues) => {
  useEffect(() => {
    const data = props.values;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        props.form.setValue(
          key as keyof StudentGuardianFormProps,
          value as string
        );
      });
    }
  }, [props.values]);
};

export default useStudentGuardianValues;
