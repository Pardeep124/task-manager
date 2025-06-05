export interface Task {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
  createdAt?: string;
}
