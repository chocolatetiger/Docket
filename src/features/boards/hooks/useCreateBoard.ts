import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { Board } from '../../../types';
import { useNavigate } from 'react-router-dom';

const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (title: string) =>
      api<Board>('/boards', {
        method: 'POST',
        body: JSON.stringify({ title }),
      }),
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      navigate(`/board/${newBoard.id}`);
    },
  });
};

export { useCreateBoard };
