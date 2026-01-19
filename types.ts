
export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  established: string;
  color: string;
}

export interface Policy {
  id: string;
  company: string;
  name: string;
  type: string;
  description: string;
  detailed_info: string;
  eligibility: string;
  tax_benefits: string;
  features: string[];
  is_popular: boolean;
  rating: number;
}

export interface ServiceRequest {
  id: string;
  user_id: string;
  user_name: string;
  service_type: string;
  company: string;
  description: string;
  preferred_date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Calculation {
  id: string;
  user_id: string;
  company: string;
  policy_type: string;
  age: number;
  term: number;
  sum_assured: number;
  frequency: string;
  annual_premium: number;
  created_at: string;
}
