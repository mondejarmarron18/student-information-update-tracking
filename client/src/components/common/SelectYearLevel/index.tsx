import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useYearLevels from "@/hooks/useYearLevels";
import { SelectProps } from "@radix-ui/react-select";

type Props = SelectProps & {
  placeholder?: string;
};

const SelectYearLevel = (props: Props) => {
  const { data } = useYearLevels();
  const yearLevels = data?.data || [];

  return (
    <Select
      onValueChange={props.onValueChange}
      defaultValue={props.value}
      value={props.value}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder || "Select year level"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {yearLevels.map((yearLevel) => (
          <SelectItem key={yearLevel._id} value={yearLevel._id}>
            {yearLevel.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectYearLevel;
