import { useSearchParams } from 'react-router-dom';
import type { Task } from '../../../types';
import { createPortal } from 'react-dom';
import { useMemo } from 'react';
import { capitalise, formatDate, priorityStyles } from '../../../lib/utils';
interface CardDetailModalProps {
  tasks: Task[];
}
const CardDetailModal = ({ tasks }: CardDetailModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardId = searchParams.get('cardId');
  const task = useMemo(() => {
    return tasks.find((task) => task.id === cardId);
  }, [cardId, tasks]);

  const closeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('cardId');
    setSearchParams(params);
  };
  if (!cardId || !task) return null;
  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{task.title}</h2>
          <button
            className="text-gray-400 hover:text-white transition-colors text-xl"
            onClick={closeModal}
          >
            x
          </button>
        </div>
        <p className="text-gray-300 mb-6">
          {task.description || 'No Description'}
        </p>
        <div className="flex items-center gap-4">
          <span
            className={`text-xs px-2 py-1 rounded-full ${priorityStyles[task.priority]}`}
          >
            {capitalise(task.priority)}
          </span>
          <span className="text-gray-400 text-sm">
            {task.dueDate ? formatDate(task.dueDate) : 'No date'}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export { CardDetailModal };
