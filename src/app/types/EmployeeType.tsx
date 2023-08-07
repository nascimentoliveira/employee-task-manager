export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  department: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
};
