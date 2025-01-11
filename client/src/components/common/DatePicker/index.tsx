import { format, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  className?: string;
  onSelect: (date: Date | undefined) => void;
  value?: Date;
  disabled?: boolean;
};

const DatePicker = ({
  className,
  onSelect,
  value,
  disabled = false,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          fromDate={subYears(new Date(), 80)}
          toDate={subYears(new Date(), 15)}
          captionLayout="dropdown-buttons"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
