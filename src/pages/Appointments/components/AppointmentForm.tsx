
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

import { Form } from "@/components/ui/form";
import { appointmentSchema, AppointmentFormValues } from "../schema";
import { mockDoctors, mockServices, timeSlots } from "../data";
import {
  AppointmentDatePicker,
  AppointmentFormActions,
  AppointmentNotes,
  AppointmentTimePicker,
  DoctorSelector,
  PatientSelector,
  ServiceSelector
} from "@/components/appointments/scheduling";
import { mockAppointments } from "@/data/mockData";
import { Appointment } from "@/types/appointment";

interface AppointmentFormProps {
  onCancel: () => void;
}

const AppointmentForm = ({ onCancel }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    setIsSubmitting(true);
    console.log("Appointment values:", values);
    
    // Simulate API call
    setTimeout(() => {
      const doctorName = getDoctorName(values.doctorId);
      
      // Create new appointment object
      const newAppointment: Appointment = {
        id: uuidv4(),
        patientId: uuidv4(),
        patientName: values.patientName,
        doctorId: values.doctorId,
        doctorName: doctorName || "Unknown Doctor",
        date: values.date.toLocaleDateString(),
        time: values.time,
        duration: values.duration,
        service: values.service,
        notes: values.notes || "",
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };
      
      // Add new appointment to the mock data
      mockAppointments.unshift(newAppointment);
      
      toast.success("Appointment scheduled successfully", {
        description: `Appointment with ${doctorName} on ${values.date.toLocaleDateString()} at ${values.time}`,
      });
      
      setIsSubmitting(false);
      navigate("/appointments");
    }, 1000);
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <PatientSelector form={form} />
          
          <DoctorSelector 
            form={form} 
            doctors={mockDoctors} 
            onDoctorChange={setSelectedDoctor} 
          />
          
          <ServiceSelector 
            form={form} 
            services={mockServices} 
          />
          
          <AppointmentDatePicker form={form} />
          
          <AppointmentTimePicker 
            form={form} 
            timeSlots={timeSlots} 
          />
        </div>

        <AppointmentNotes form={form} />

        <AppointmentFormActions 
          onCancel={onCancel} 
          isSubmitting={isSubmitting} 
        />
      </form>
    </Form>
  );
};

export default AppointmentForm;
