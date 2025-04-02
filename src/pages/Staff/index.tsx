
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
import { Plus, Search, UserPlus, Users } from "lucide-react";

const StaffPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Mock staff data - in a real app, this would come from an API
  const mockStaff = [
    { id: "STF001", name: "Dr. Jane Smith", role: "doctor", department: "Cardiology", status: "active" },
    { id: "STF002", name: "Michael Johnson", role: "nurse", department: "Emergency", status: "active" },
    { id: "STF003", name: "Robert Wilson", role: "admin", department: "Administration", status: "active" },
    { id: "STF004", name: "Sarah Brown", role: "doctor", department: "Pediatrics", status: "inactive" },
    { id: "STF005", name: "Emily Davis", role: "nurse", department: "Surgery", status: "active" },
  ];

  const filteredStaff = mockStaff.filter(
    (staff) =>
      (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || staff.role === roleFilter)
  );

  const handleAddNewStaff = () => {
    navigate("/staff/new");
  };

  const handleViewStaff = (id: string) => {
    navigate(`/staff/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <Button onClick={handleAddNewStaff}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hospital Staff</CardTitle>
          <CardDescription>View and manage hospital staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="doctor">Doctors</SelectItem>
                <SelectItem value="nurse">Nurses</SelectItem>
                <SelectItem value="admin">Administrative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredStaff.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-2 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No staff found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No staff members match your search criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm font-medium text-muted-foreground">
                    <th className="pb-3 text-left font-medium">ID</th>
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">Role</th>
                    <th className="pb-3 text-left font-medium">Department</th>
                    <th className="pb-3 text-center font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="text-sm">
                      <td className="py-3 font-medium">{staff.id}</td>
                      <td className="py-3">{staff.name}</td>
                      <td className="py-3 capitalize">{staff.role}</td>
                      <td className="py-3">{staff.department}</td>
                      <td className="py-3 text-center">
                        <Badge
                          variant="outline"
                          className={`capitalize ${
                            staff.status === "active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {staff.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewStaff(staff.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        {filteredStaff.length > 0 && (
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredStaff.length} of {mockStaff.length} staff members
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default StaffPage;
