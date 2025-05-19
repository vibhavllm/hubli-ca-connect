
export type ClientType = 
  | 'individual'
  | 'educational'
  | 'corporate'
  | 'partnership'
  | 'other';

export type ServiceType =
  | 'audit'
  | 'tax_consulting'
  | 'gst_filing'
  | 'income_tax'
  | 'compliance'
  | 'advisory';

export type ServiceStatus =
  | 'pending'
  | 'in_progress'
  | 'review'
  | 'completed'
  | 'on_hold';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  pan?: string;
  gstin?: string;
  contactPerson?: string;
  email: string;
  phone: string;
  address: string;
  tags: string[];
  since: string; // Date string
  industry?: string;
}

export interface Service {
  id: string;
  clientId: string;
  type: ServiceType;
  description: string;
  status: ServiceStatus;
  startDate: string; // Date string
  dueDate: string; // Date string
  assignedTo: string; // User ID
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId?: string;
  serviceId?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: TaskPriority;
  dueDate: string; // Date string
  assignedTo: string; // User ID
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  date: string; // Date string
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
}
