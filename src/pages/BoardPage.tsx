import type { Column, Task } from '../types';
import { ColumnList } from '../features/tasks/components/ColumnList';

const columns: Column[] = [
  { id: 'col-1', boardId: '1', title: 'To Do' },
  { id: 'col-2', boardId: '1', title: 'In Progress' },
  { id: 'col-3', boardId: '1', title: 'Done' },
];

const tasks: Task[] = [
  {
    id: 't-1',
    columnId: 'col-1',
    title: 'Fix login bug',
    description: '',
    priority: 'high',
    dueDate: '2024-03-15',
    order: 1,
  },
  {
    id: 't-2',
    columnId: 'col-1',
    title: 'Write tests',
    description: '',
    priority: 'low',
    dueDate: null,
    order: 2,
  },
  {
    id: 't-3',
    columnId: 'col-2',
    title: 'Add authentication',
    description: '',
    priority: 'medium',
    dueDate: null,
    order: 1,
  },
  {
    id: 't-4',
    columnId: 'col-3',
    title: 'Project setup',
    description: '',
    priority: 'low',
    dueDate: '2024-03-10',
    order: 1,
  },
];

const BoardPage = () => {
  return (
    <main className="px-4 py-6 mx-auto max-w-7xl md:px-6 flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-bold text-white">Work Projects</h1>
      </header>

      <ColumnList columns={columns} tasks={tasks} />
    </main>
  );
};

export { BoardPage };
