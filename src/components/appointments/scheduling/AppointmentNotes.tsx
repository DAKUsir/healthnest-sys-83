
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AppointmentNotesProps {
  form: UseFormReturn<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  disabled?: boolean;
}

export const AppointmentNotes = ({
  form,
  name = "notes",
  label = "Notes",
  placeholder = "Add any special notes or instructions",
  minHeight = "100px",
  disabled = false,
}: AppointmentNotesProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`min-h-[${minHeight}]`}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
