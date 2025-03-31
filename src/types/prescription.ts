
export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  instructions?: string;
  followUp?: {
    date: string;
    notes: string;
  };
  createdAt: string;
}
