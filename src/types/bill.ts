
export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category: 'consultation' | 'medication' | 'lab' | 'procedure' | 'room' | 'misc';
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  items: BillItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'partial';
  paymentMethod?: 'cash' | 'card' | 'insurance' | 'bank transfer';
  insuranceCoverage?: number;
  patientResponsibility?: number;
  notes?: string;
  createdAt: string;
}
