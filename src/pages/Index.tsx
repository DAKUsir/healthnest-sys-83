
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarPlus, ClipboardList, UserPlus, Activity, HeartPulse, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const quickActions = [
    {
      title: "Schedule Appointment",
      description: "Create a new patient appointment",
      icon: CalendarPlus,
      action: () => navigate("/appointments/new")
    },
    {
      title: "Register Patient",
      description: "Add a new patient to the system",
      icon: UserPlus,
      action: () => navigate("/patients/new")
    },
    {
      title: "View Appointments",
      description: "See today's scheduled appointments",
      icon: ClipboardList,
      action: () => navigate("/appointments")
    },
    {
      title: "Patient Records",
      description: "Access medical records and history",
      icon: HeartPulse,
      action: () => navigate("/records")
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to HealthNest</h1>
        <p className="text-muted-foreground mt-2">
          Your comprehensive hospital management dashboard
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,583</div>
            <p className="text-xs text-muted-foreground mt-1">+8.2% from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-primary" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">4 more than yesterday</p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-primary" style={{ width: '40%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">2 urgent</p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-destructive" style={{ width: '20%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff on Duty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">3 doctors, 15 staff</p>
            <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-primary" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {quickActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="justify-between h-auto py-3"
                  onClick={action.action}
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {i === 0 ? "New patient registered" : 
                       i === 1 ? "Appointment rescheduled" : 
                       i === 2 ? "Lab results updated" : 
                       "Prescription created"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {i === 0 ? "John Doe was added to the system" : 
                       i === 1 ? "Jane Smith moved to Thursday" : 
                       i === 2 ? "Blood work results uploaded for Patient #254" : 
                       "Dr. Williams created prescription for Patient #118"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {i === 0 ? "10 minutes ago" : 
                       i === 1 ? "1 hour ago" : 
                       i === 2 ? "3 hours ago" : 
                       "5 hours ago"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
