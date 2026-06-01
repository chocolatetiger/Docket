import { useQuery } from '@tanstack/react-query';
import type { Task } from '../../../types';
import { api } from '../../../lib/api';

const useTasks = (boardId: string) => {
  return useQuery({
    queryKey: ['boards', boardId, 'tasks'],
    queryFn: () => api<Task[]>(`/boards/${boardId}/tasks`),
    enabled: !!boardId,
  });
};

export { useTasks };
