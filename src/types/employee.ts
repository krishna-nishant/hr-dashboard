export interface PerformanceHistory {
  month: string;
  rating: number;
  comment: string;
}

export interface Project {
  id: number;
  name: string;
  role: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  startDate: string;
  endDate?: string;
  description: string;
  completion: number;
}

export interface Feedback {
  id: number;
  from: string;
  date: string;
  rating: number;
  message: string;
  type: 'peer' | 'manager' | 'self';
}

export interface EmployeeDetails {
  address: string;
  phone: string;
  bio: string;
  performanceHistory: PerformanceHistory[];
  projects: Project[];
  feedback: Feedback[];
} 