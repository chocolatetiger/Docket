import type { Priority, Task } from '../../../types';
import { capitalise, formatDate } from '../../../lib/utils';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
}
const priorityStyles: Record<Priority, string> = {
  high: 'bg-red-500/20 text-red-400 border border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });
  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`bg-gray-900 
          border border-gray-800 
          rounded-xl p-5 
          hover:bg-gray-800 
          hover:border-gray-700 
          hover:-translate-y-1 
          hover:shadow-xl
          transition-all duration-200
          ${isDragging ? 'opacity-50' : ''}
          cursor-grab`}
    >
      <div className="text-white font-semibold text-lg">{task.title}</div>
      <div className="text-gray-400 mt-2 text-lg">{task.description}</div>
      <div
        className={`text-xs px-2 py-1 rounded-full ${priorityStyles[task.priority]}`}
      >
        {capitalise(task.priority)}
      </div>
      <div className="text-gray-400 text-sm mt-2">
        {task.dueDate ? formatDate(task.dueDate) : 'No date'}
      </div>
    </article>
  );
};

export { TaskCard };
