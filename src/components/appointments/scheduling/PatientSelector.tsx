
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PatientSelectorProps {
  form: UseFormReturn<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const PatientSelector = ({
  form,
  name = "patientName",
  label = "Patient Name",
  placeholder = "Enter patient name",
  disabled = false,
}: PatientSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              {...field} 
              disabled={disabled} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
