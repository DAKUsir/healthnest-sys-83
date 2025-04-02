
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../../schema";

interface PatientFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export const PatientField = ({ form }: PatientFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="patientName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Patient Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter patient name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
