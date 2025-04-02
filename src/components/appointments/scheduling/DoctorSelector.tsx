
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Doctor {
  id: string;
  name: string;
  department: string;
}

interface DoctorSelectorProps {
  form: UseFormReturn<any>;
  doctors: Doctor[];
  name?: string;
  label?: string;
  placeholder?: string;
  onDoctorChange?: (value: string) => void;
  disabled?: boolean;
}

export const DoctorSelector = ({
  form,
  doctors,
  name = "doctorId",
  label = "Doctor",
  placeholder = "Select a doctor",
  onDoctorChange,
  disabled = false,
}: DoctorSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onDoctorChange) onDoctorChange(value);
            }}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.department}
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
