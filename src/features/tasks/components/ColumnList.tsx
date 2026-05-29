import type { Column as ColumnType, Task as TaskType } from '../../../types';
import { Column } from './Column';
interface ColumnListProps {
  columns: ColumnType[];
  tasks: TaskType[];
}

const ColumnList = ({ columns, tasks }: ColumnListProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {columns.map((column) => (
        <li key={column.id}>
          <Column
            column={column}
            tasks={tasks.filter((task) => task.columnId === column.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export { ColumnList };
