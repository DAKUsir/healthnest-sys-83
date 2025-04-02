
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../../schema";
import { timeSlots } from "../../data";

interface TimeFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export const TimeField = ({ form }: TimeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot">
                  <div className="flex items-center gap-2">
                    {field.value ? (
                      <>
                        <Clock className="h-4 w-4" />
                        {field.value}
                      </>
                    ) : (
                      "Select time slot"
                    )}
                  </div>
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
