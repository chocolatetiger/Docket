import type { Column as ColumnType, Task as TaskType } from '../../../types';
import { Column } from './Column';
interface ColumnListProps {
  columns: ColumnType[];
  tasks: TaskType[];
  onTaskClick: (taskId: string) => void;
}

const ColumnList = ({ columns, tasks, onTaskClick }: ColumnListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {columns.map((column) => (
        <li key={column.id}>
          <Column
            column={column}
            tasks={tasks.filter((task) => task.columnId === column.id)}
            onTaskClick={onTaskClick}
          />
        </li>
      ))}
    </ul>
  );
};

export { ColumnList };
