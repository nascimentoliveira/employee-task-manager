import { Employee } from './EmployeeType';

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignee: Employee;
  due_date?: Date;
  created_at: string;
  updated_at: string;
};
