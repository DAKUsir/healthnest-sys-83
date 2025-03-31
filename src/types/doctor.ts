
export interface Doctor {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  department: string;
  specialization: string;
  qualification: string;
  experience: number; // in years
  phone: string;
  email: string;
  address: string;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  status: 'active' | 'inactive' | 'on-leave';
  joiningDate: string;
}
