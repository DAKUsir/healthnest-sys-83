
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../../schema";
import { mockDoctors } from "../../data";

interface DoctorFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
  onDoctorChange: (value: string) => void;
}

export const DoctorField = ({ form, onDoctorChange }: DoctorFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="doctorId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Doctor</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onDoctorChange(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mockDoctors.map((doctor) => (
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
