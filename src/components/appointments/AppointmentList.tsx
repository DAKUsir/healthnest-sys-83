
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, MoreVertical, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Appointment } from "@/types/appointment";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EditAppointmentDialog } from "./EditAppointmentDialog";

interface AppointmentListProps {
  appointments: Appointment[];
  isLoading?: boolean;
  onAppointmentUpdated?: (updatedAppointment: Appointment) => void;
}

const AppointmentList = ({
  appointments,
  isLoading = false,
  onAppointmentUpdated,
}: AppointmentListProps) => {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (appointmentId: string) => {
    toast.info(`Viewing appointment details for ID: ${appointmentId}`);
    // Future implementation can navigate to a detailed view
    // navigate(`/appointments/${appointmentId}`);
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDialogOpen(true);
  };

  const handleSaveAppointment = (updatedAppointment: Appointment) => {
    if (onAppointmentUpdated) {
      onAppointmentUpdated(updatedAppointment);
    }
  };

  const handleReschedule = (appointmentId: string) => {
    toast.info(`Rescheduling appointment ID: ${appointmentId}`);
    // Ideally this would open a reschedule dialog or navigate to reschedule page
  };

  const handleCancel = (appointmentId: string) => {
    toast.success(`Appointment ID: ${appointmentId} has been cancelled`, {
      description: "The appointment has been removed from the schedule"
    });
    // In a real app, this would call an API to update the appointment status
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-muted"></div>
                <div className="h-3 w-24 rounded bg-muted"></div>
              </div>
              <div className="h-6 w-20 rounded bg-muted"></div>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-muted"></div>
                <div className="h-3 w-32 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
        <Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No appointments</h3>
        <p className="text-sm text-muted-foreground">
          There are no appointments scheduled for today.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="rounded-lg border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {appointment.date}
              </span>
              <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {appointment.time}
              </span>
            </div>
            <Badge
              variant="outline"
              className={cn("capitalize", getStatusColor(appointment.status))}
            >
              {appointment.status}
            </Badge>
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">
                {appointment.patientName}
              </h4>
              <p className="text-xs text-muted-foreground">
                {appointment.service}
              </p>
            </div>
            <div className="ml-auto flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="mr-2"
                onClick={() => handleEdit(appointment)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => handleViewDetails(appointment.id)}>
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleReschedule(appointment.id)}>
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
      
      <EditAppointmentDialog 
        appointment={selectedAppointment}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default AppointmentList;
