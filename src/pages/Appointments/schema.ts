
import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  patientId: z.string().optional(),
  doctorId: z.string().min(1, "Please select a doctor"),
  service: z.string().min(1, "Please select a service"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  duration: z.number().default(30),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
