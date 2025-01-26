import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpecializations from "@/hooks/useSpecializations";
import { SelectProps } from "@radix-ui/react-select";

type Props = SelectProps & {
  courseId?: string;
  placeholder?: string;
};

const SelectCourseSpecialization = (props: Props) => {
  const { data } = useSpecializations({
    courseId: props?.courseId,
  });
  const specializations = data?.data || [];

  return (
    <Select
      onValueChange={props.onValueChange}
      defaultValue={props.value}
      value={props.value}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder || "Select course"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {specializations.map((specialization) => (
          <SelectItem key={specialization._id} value={specialization._id}>
            {specialization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCourseSpecialization;
