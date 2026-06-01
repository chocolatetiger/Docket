import { useQuery } from '@tanstack/react-query';
import type { Board } from '../../../types';
import { api } from '../../../lib/api';

const useBoard = (id: string) => {
  return useQuery({
    queryKey: ['boards', id],
    queryFn: () => api<Board>(`/boards/${id}`),
  });
};

export { useBoard };
