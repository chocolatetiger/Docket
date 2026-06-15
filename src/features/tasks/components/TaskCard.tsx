import type { Task } from '../../../types';
import { capitalise, formatDate, priorityStyles } from '../../../lib/utils';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
  onTaskClick: (taskId: string) => void;
}

const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });
  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => {
        onTaskClick(task.id);
      }}
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
