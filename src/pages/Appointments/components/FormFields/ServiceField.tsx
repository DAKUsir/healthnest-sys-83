
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { AppointmentFormValues } from "../../schema";
import { mockServices } from "../../data";

interface ServiceFieldProps {
  form: UseFormReturn<AppointmentFormValues>;
}

export const ServiceField = ({ form }: ServiceFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Service</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mockServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
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
