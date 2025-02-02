import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoles from "@/hooks/useRoles";
import { SelectProps } from "@radix-ui/react-select";
import _ from "lodash";

type Props = SelectProps & {
  placeholder?: string;
};

const SelectRole = (props: Props) => {
  const { data } = useRoles();
  const roles = data?.data || [];

  return (
    <Select
      onValueChange={props.onValueChange}
      defaultValue={`${props.value}`}
      value={`${props.value}`}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={props.placeholder || "Select role"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role._id} value={role._id}>
            {_.startCase(_.lowerCase(role.name))}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectRole;
