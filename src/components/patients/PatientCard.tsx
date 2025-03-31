import { Button } from "@/components/ui/button";
import { Calendar, FileText, Phone, UserRound } from "lucide-react";
import { Patient } from "@/types/patient";

interface PatientCardProps {
  patient: Patient;
  onViewDetails?: (id: string) => void;
  onEditPatient?: (id: string) => void;
}

const PatientCard = ({
  patient,
  onViewDetails,
  onEditPatient,
}: PatientCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{patient.name}</h3>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              <span>{patient.dob}</span>
              <span className="mx-1">•</span>
              <span>{patient.gender}</span>
            </div>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            patient.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          )}
        >
          {patient.status}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-md bg-accent p-2">
          <p className="text-xs font-medium text-muted-foreground">ID</p>
          <p className="text-sm font-medium">{patient.id}</p>
        </div>
        <div className="rounded-md bg-accent p-2">
          <p className="text-xs font-medium text-muted-foreground">Blood</p>
          <p className="text-sm font-medium">{patient.bloodType}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center space-x-2 text-sm">
        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">{patient.phone}</span>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails?.(patient.id)}
        >
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          Records
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={() => onEditPatient?.(patient.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default PatientCard;
