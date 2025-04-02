
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppointmentForm from "./components/AppointmentForm";

const NewAppointment = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    toast.info("Appointment scheduling cancelled");
    navigate("/appointments");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Schedule New Appointment</h1>
        <Button variant="outline" onClick={handleCancel}>
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
          <AppointmentForm onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAppointment;
