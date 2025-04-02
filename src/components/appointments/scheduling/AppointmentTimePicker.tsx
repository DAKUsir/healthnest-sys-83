
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface AppointmentTimePickerProps {
  form: UseFormReturn<any>;
  timeSlots: string[];
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const AppointmentTimePicker = ({
  form,
  timeSlots,
  name = "time",
  label = "Time",
  placeholder = "Select time slot",
  disabled = false,
}: AppointmentTimePickerProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder}>
                  {field.value && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {field.value}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
