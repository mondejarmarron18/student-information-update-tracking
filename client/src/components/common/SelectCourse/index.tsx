import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCourses from "@/hooks/useCourses";
import { SelectProps } from "@radix-ui/react-select";

type Props = SelectProps & {
  placeholder?: string;
};

const SelectCourse = (props: Props) => {
  const { data } = useCourses();
  const courses = data?.data || [];

  return (
    <Select
      onValueChange={props.onValueChange}
      defaultValue={`${props.value}`}
      value={`${props.value}`}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder || "Select course"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {courses.map((course) => (
          <SelectItem key={course._id} value={course._id}>
            {course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCourse;
