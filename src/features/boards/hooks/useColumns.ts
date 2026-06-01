import { useQuery } from '@tanstack/react-query';
import type { Column } from '../../../types';
import { api } from '../../../lib/api';

const useColumns = (boardId: string) => {
  return useQuery({
    queryKey: ['boards', boardId, 'columns'],
    queryFn: () => api<Column[]>(`/boards/${boardId}/columns`),
    enabled: !!boardId,
  });
};

export { useColumns };
