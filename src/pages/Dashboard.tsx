
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentList from "@/components/appointments/AppointmentList";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  CalendarClock,
  DollarSign,
  Pill,
  PlusCircle,
  UserRound,
  Users,
} from "lucide-react";
import { dashboardStats, getTodayAppointments, getRecentPatients } from "@/data/mockData";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNewAppointment = () => {
    navigate("/appointments/new");
    toast({
      title: "Create Appointment",
      description: "You can now create a new appointment.",
    });
  };

  const todayAppointments = getTodayAppointments();
  const recentPatients = getRecentPatients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={handleNewAppointment}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Patients"
              value={dashboardStats.totalPatients}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: dashboardStats.patientsGrowth, isPositive: true }}
              description="Total registered patients"
            />
            <StatsCard
              title="Doctors"
              value={dashboardStats.totalDoctors}
              icon={<UserRound className="h-5 w-5" />}
              description="Active medical staff"
            />
            <StatsCard
              title="Appointments"
              value={dashboardStats.totalAppointments}
              icon={<CalendarClock className="h-5 w-5" />}
              trend={{ value: dashboardStats.appointmentsGrowth, isPositive: true }}
              description="Last 30 days"
            />
            <StatsCard
              title="Revenue"
              value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: dashboardStats.revenueGrowth, isPositive: true }}
              description="Last 30 days"
            />
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  Manage your appointments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentList appointments={todayAppointments} />
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/appointments")}
                >
                  View All Appointments
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hospital Activity</CardTitle>
                <CardDescription>
                  Real-time hospital statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-lg border p-3">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          Bed Occupancy
                        </p>
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-xl font-semibold">
                            {dashboardStats.occupancyRate}%
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            180/237 beds
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 rounded-lg border p-3">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <Pill className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          Prescriptions
                        </p>
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-xl font-semibold">214</h4>
                          <p className="text-xs text-muted-foreground">
                            Today
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Patients */}
                  <div className="mt-4">
                    <h4 className="mb-3 font-medium">Recent Patients</h4>
                    <div className="rounded-md border">
                      <div className="divide-y">
                        {recentPatients.slice(0, 5).map((patient) => (
                          <div
                            key={patient.id}
                            className="flex items-center justify-between p-3"
                          >
                            <div className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <UserRound className="h-4 w-4 text-primary" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium">
                                  {patient.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  ID: {patient.id}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => navigate(`/patients/${patient.id}`)}
                            >
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/patients")}
                >
                  View All Patients
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>
                View and manage all scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Appointments Management</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This section will be implemented in the next phase.
                </p>
                <Button className="mt-4" onClick={() => navigate('/appointments')}>
                  Go to Full Appointments Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                View and manage all registered patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Patient Records</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This section will be implemented in the next phase.
                </p>
                <Button className="mt-4" onClick={() => navigate('/patients')}>
                  Go to Full Patients Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
