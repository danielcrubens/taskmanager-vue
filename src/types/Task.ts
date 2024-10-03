export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  userId: string;
}

export interface NewTask {
  title: string;
  description: string;
}