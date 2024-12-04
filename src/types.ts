export interface User {
  id: string;
  name: string;
  email: string;
  role: 'contributor' | 'client';
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed';
  assignedTo?: string;
  createdAt: string;
}

export interface Contribution {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}