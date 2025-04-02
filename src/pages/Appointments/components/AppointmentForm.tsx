
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { appointmentSchema, AppointmentFormValues } from "../schema";
import { mockDoctors } from "../data";
import {
  PatientField,
  DoctorField,
  ServiceField,
  DateField,
  TimeField,
  NotesField
} from "./FormFields";

interface AppointmentFormProps {
  onCancel: () => void;
}

const AppointmentForm = ({ onCancel }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      doctorId: "",
      service: "",
      duration: 30,
      notes: "",
    },
  });

  const onSubmit = (values: AppointmentFormValues) => {
    console.log("Appointment values:", values);
    
    toast.success("Appointment scheduled successfully", {
      description: `Appointment with ${getDoctorName(values.doctorId)} on ${values.date.toLocaleDateString()} at ${values.time}`,
    });
    
    navigate("/appointments");
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <PatientField form={form} />
          <DoctorField form={form} onDoctorChange={setSelectedDoctor} />
          <ServiceField form={form} />
          <DateField form={form} />
          <TimeField form={form} />
        </div>

        <NotesField form={form} />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Schedule Appointment</Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
