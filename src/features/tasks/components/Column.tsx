import { useDroppable } from '@dnd-kit/core';
import type { Column as ColumnType, Task as TaskType } from '../../../types';
import { TaskCard } from './TaskCard';
import { AddCardForm } from './AddCardForm';
import { useState } from 'react';
interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  onTaskClick: (taskId: string) => void;
}
const Column = ({ column, tasks, onTaskClick }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const onAddCardClose = () => {
    setIsAddCardOpen(false);
  };
  return (
    <section
      ref={setNodeRef}
      className={`flex flex-col
       bg-gray-900/50
        rounded-xl 
        p-4
        min-h-96
        ${isOver ? 'bg-gray-700/50 border border-gray-600' : 'border border-transparent'}
`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white font-semibold">{column.title}</span>
        <span className="text-gray-400 text-sm">({tasks.length})</span>
      </div>

      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} onTaskClick={onTaskClick} />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setIsAddCardOpen(true);
        }}
        className="mt-3 w-full text-gray-400 hover:text-white hover:bg-gray-800 text-sm py-2 rounded-lg transition-colors duration-200"
      >
        + Add Card
      </button>
      {isAddCardOpen && (
        <AddCardForm
          onClose={onAddCardClose}
          columnId={column.id}
          boardId={column.boardId}
          order={tasks.length + 1}
        />
      )}
    </section>
  );
};

export { Column };
