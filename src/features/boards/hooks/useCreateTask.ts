import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../../../types';
import { api } from '../../../lib/api';

const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskData: Omit<Task, 'id'>) =>
      api<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', boardId, 'tasks'] });
    },
  });
};

export { useCreateTask };
