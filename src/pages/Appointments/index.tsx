import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Search } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import AppointmentList from "@/components/appointments/AppointmentList";
import { Appointment } from "@/types/appointment";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || appointment.status === statusFilter)
  );

  const upcomingAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === "scheduled"
  );
  
  const completedAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const handleNewAppointment = () => {
    navigate("/appointments/new");
  };

  const handleAppointmentUpdated = (updatedAppointment: Appointment) => {
    const updatedAppointments = appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    );
    setAppointments(updatedAppointments);
    
    const mockIndex = mockAppointments.findIndex(appt => appt.id === updatedAppointment.id);
    if (mockIndex !== -1) {
      mockAppointments[mockIndex] = updatedAppointment;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <Button onClick={handleNewAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Appointments</CardTitle>
          <CardDescription>
            View and manage patient appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No upcoming appointments</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no upcoming appointments that match your criteria.
                  </p>
                </div>
              ) : (
                <AppointmentList 
                  appointments={upcomingAppointments} 
                  onAppointmentUpdated={handleAppointmentUpdated}
                />
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No completed appointments</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no completed appointments that match your criteria.
                  </p>
                </div>
              ) : (
                <AppointmentList 
                  appointments={completedAppointments}
                  onAppointmentUpdated={handleAppointmentUpdated}
                />
              )}
            </TabsContent>
            
            <TabsContent value="all">
              {filteredAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No appointments found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No appointments match your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <AppointmentList 
                  appointments={filteredAppointments}
                  onAppointmentUpdated={handleAppointmentUpdated}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        {filteredAppointments.length > 0 && (
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AppointmentsPage;
