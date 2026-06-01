import { useQuery } from '@tanstack/react-query';
import type { Board } from '../../../types';
import { api } from '../../../lib/api';

const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => api<Board[]>('/boards'),
  });
};

export { useBoards };
