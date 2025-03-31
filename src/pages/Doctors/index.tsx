
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
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Stethoscope } from "lucide-react";
import { mockDoctors } from "@/data/mockData";
import { cn } from "@/lib/utils";

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Extract unique departments for filter
  const departments = Array.from(new Set(mockDoctors.map((doctor) => doctor.department)));

  // Filter doctors based on search term and department
  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (departmentFilter === "all" || doctor.department === departmentFilter)
  );

  const handleAddNewDoctor = () => {
    navigate("/doctors/new");
  };

  const handleViewDoctor = (id: string) => {
    navigate(`/doctors/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-semibold">Doctors</h1>
        <Button onClick={handleAddNewDoctor}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Doctor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical Staff</CardTitle>
          <CardDescription>View and manage all doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Stethoscope className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No doctors found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No doctors match your search criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setDepartmentFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Stethoscope className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getStatusColor(doctor.status))}
                    >
                      {doctor.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-accent p-2">
                      <p className="text-xs font-medium text-muted-foreground">Department</p>
                      <p className="text-sm font-medium">{doctor.department}</p>
                    </div>
                    <div className="rounded-md bg-accent p-2">
                      <p className="text-xs font-medium text-muted-foreground">Experience</p>
                      <p className="text-sm font-medium">{doctor.experience} years</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs font-medium text-muted-foreground">Availability</p>
                    <p className="text-sm">
                      {doctor.availability.days.join(", ")} ({doctor.availability.startTime} - {doctor.availability.endTime})
                    </p>
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => handleViewDoctor(doctor.id)}
                  >
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {filteredDoctors.length > 0 && (
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredDoctors.length} of {mockDoctors.length} doctors
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default DoctorsPage;
