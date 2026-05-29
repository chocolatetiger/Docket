import type { Column as ColumnType, Task as TaskType } from '../../../types';
import { TaskCard } from './TaskCard';
interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}
const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <section
      className="flex flex-col
       bg-gray-900/50
        rounded-xl 
        p-4
        min-h-96
"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white font-semibold">{column.title}</span>
        <span className="text-gray-400 text-sm">({tasks.length})</span>
      </div>

      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { Column };
