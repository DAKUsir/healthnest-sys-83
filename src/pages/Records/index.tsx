
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
import { FileText, FilePlus, Search, UserRound } from "lucide-react";
import { mockPrescriptions, mockPatients } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const MedicalRecordsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patientFilter, setPatientFilter] = useState("all");

  // Filter prescriptions based on search term and patient
  const filteredPrescriptions = mockPrescriptions.filter(
    (prescription) =>
      (prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (patientFilter === "all" || prescription.patientId === patientFilter)
  );

  const handleCreatePrescription = () => {
    navigate("/records/new");
  };

  const handleViewPrescription = (id: string) => {
    navigate(`/records/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-semibold">Medical Records</h1>
        <Button onClick={handleCreatePrescription}>
          <FilePlus className="mr-2 h-4 w-4" />
          Create Prescription
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
          <CardDescription>View and manage patient prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={patientFilter}
              onValueChange={setPatientFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredPrescriptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No prescriptions found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No prescriptions match your search criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setPatientFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
                    <div>
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <UserRound className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{prescription.patientName}</h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {prescription.patientId}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Doctor:</span>{" "}
                          {prescription.doctorName}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span>{" "}
                          {prescription.date}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 md:text-right">
                      <div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {prescription.medications.length} Medications
                        </Badge>
                      </div>
                      <div className="flex space-x-2 md:justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewPrescription(prescription.id)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                        >
                          Print
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm font-medium">Diagnosis</p>
                    <p className="text-sm">{prescription.diagnosis}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {filteredPrescriptions.length > 0 && (
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPrescriptions.length} of {mockPrescriptions.length} prescriptions
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default MedicalRecordsPage;
