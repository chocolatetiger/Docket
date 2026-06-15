export type Priority = 'high' | 'medium' | 'low';

export interface Board {
  id: string;
  title: string;
  createdAt: string;
}

export interface Column {
  id: string;
  boardId: string;
  title: 'To Do' | 'In Progress' | 'Done';
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  order: number;
}
