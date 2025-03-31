
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for doctors and services
const mockDoctors = [
  { id: "d1", name: "Dr. John Smith", department: "Cardiology" },
  { id: "d2", name: "Dr. Sarah Johnson", department: "Neurology" },
  { id: "d3", name: "Dr. Michael Brown", department: "Pediatrics" },
  { id: "d4", name: "Dr. Emily Davis", department: "Orthopedics" },
];

const mockServices = [
  "General Checkup",
  "Specialist Consultation",
  "Follow-up Visit",
  "Vaccination",
  "Diagnostic Test",
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

// Form schema
const appointmentSchema = z.object({
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

type AppointmentValues = z.infer<typeof appointmentSchema>;

const NewAppointment = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  
  // Initialize form
  const form = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      doctorId: "",
      service: "",
      duration: 30,
      notes: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: AppointmentValues) => {
    // Here you would normally make an API call to save the appointment
    console.log("Appointment values:", values);
    
    // Show success message
    toast.success("Appointment scheduled successfully", {
      description: `Appointment with ${getDoctorName(values.doctorId)} on ${format(values.date, "PPP")} at ${values.time}`,
    });
    
    // Navigate back to appointments page
    navigate("/appointments");
  };

  // Get doctor name by ID
  const getDoctorName = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Schedule New Appointment</h1>
        <Button variant="outline" onClick={() => navigate("/appointments")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Fill in the details to schedule a new appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Patient Information */}
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

                {/* Doctor Selection */}
                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDoctor(value);
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

                {/* Service */}
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

                {/* Date Picker */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              // Disable days in the past and weekends
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              const day = date.getDay();
                              return date < today || day === 0 || day === 6;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Selection */}
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
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any special notes or instructions"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/appointments")}
                >
                  Cancel
                </Button>
                <Button type="submit">Schedule Appointment</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAppointment;
