
export interface Patient {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  bloodType: string;
  address: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory?: {
    allergies: string[];
    conditions: string[];
    medications: string[];
    surgeries: string[];
  };
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  status: 'active' | 'inactive';
  registeredDate: string;
}
