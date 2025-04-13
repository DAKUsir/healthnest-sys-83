
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { AppointmentFormActions } from "@/components/appointments/scheduling";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash, Plus, FileText, IndianRupee } from "lucide-react";

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category: string;
}

const NewBill = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState<BillItem[]>([
    {
      id: "1",
      description: "Consultation Fee",
      quantity: 1,
      unitPrice: 150,
      amount: 150,
      category: "consultation"
    }
  ]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleAddItem = () => {
    const newItem: BillItem = {
      id: `${items.length + 1}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
      category: "consultation"
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BillItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const handleCancel = () => {
    toast.info("Bill creation cancelled");
    navigate("/billing");
  };

  const handleSubmit = () => {
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Bill created successfully");
      navigate("/billing");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create New Bill</h1>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Bill Preview</DialogTitle>
              </DialogHeader>
              <div className="mt-4 border rounded-md p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">General Hospital</h2>
                    <p className="text-sm text-muted-foreground">123 Medical Center Dr</p>
                    <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">INVOICE</p>
                    <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Invoice #: INV-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
                  <div>
                    <p className="text-sm font-medium">Bill To:</p>
                    <p className="font-medium">{selectedPatient || "Patient Name"}</p>
                    <p className="text-sm text-muted-foreground">Patient ID: {selectedPatient ? "P-" + Math.floor(Math.random() * 10000) : "P-XXXX"}</p>
                  </div>
                  {selectedDoctor && (
                    <div>
                      <p className="text-sm font-medium">Attending Physician:</p>
                      <p>{selectedDoctor}</p>
                    </div>
                  )}
                </div>
                
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.description || "Item Description"}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">
                          <div className="flex items-center justify-end">
                            <IndianRupee className="h-3.5 w-3.5 mr-1" />
                            {item.unitPrice.toFixed(2)}
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <div className="flex items-center justify-end">
                            <IndianRupee className="h-3.5 w-3.5 mr-1" />
                            {item.amount.toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="py-2 text-right font-medium">Total:</td>
                      <td className="py-2 text-right font-medium">
                        <div className="flex items-center justify-end">
                          <IndianRupee className="h-3.5 w-3.5 mr-1" />
                          {calculateTotal().toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  <p>Thank you for choosing General Hospital</p>
                  <p>For questions regarding this invoice, please contact billing@generalhospital.org</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill Information</CardTitle>
          <CardDescription>
            Enter patient and service details to generate a bill
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                    <SelectItem value="Emily Brown">Emily Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Michael Clark">Dr. Michael Clark</SelectItem>
                    <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                    <SelectItem value="Dr. James Taylor">Dr. James Taylor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Bill Date</Label>
                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select defaultValue="card">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Bill Items</Label>
                <Button variant="outline" size="sm" onClick={handleAddItem}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Item
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.category}
                          onValueChange={(value) => updateItem(item.id, "category", value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="medication">Medication</SelectItem>
                            <SelectItem value="lab">Laboratory</SelectItem>
                            <SelectItem value="procedure">Procedure</SelectItem>
                            <SelectItem value="room">Room Charge</SelectItem>
                            <SelectItem value="misc">Miscellaneous</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                          className="w-16 text-right"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <IndianRupee className="h-3.5 w-3.5 mr-1" />
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Price"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                            className="w-24 text-right"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <div className="flex items-center justify-end">
                          <IndianRupee className="h-3.5 w-3.5 mr-1" />
                          {item.amount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={items.length === 1}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-medium">
                      Total:
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <div className="flex items-center justify-end">
                        <IndianRupee className="h-3.5 w-3.5 mr-1" />
                        {calculateTotal().toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes or instructions"
                rows={3}
              />
            </div>
            
            <AppointmentFormActions
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Create Bill"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewBill;
