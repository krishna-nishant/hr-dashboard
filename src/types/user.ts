export type Department = 'HR' | 'Tech' | 'Finance';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: Department;
  performanceRating: number;
  image?: string;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  image: string;
  gender: string;
} 