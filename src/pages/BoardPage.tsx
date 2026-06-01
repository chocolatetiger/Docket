import { ColumnList } from '../features/tasks/components/ColumnList';
import { useColumns } from '../features/boards/hooks/useColumns';
import { useParams } from 'react-router-dom';
import { useTasks } from '../features/boards/hooks/useTasks';

const BoardPage = () => {
  const { id } = useParams();
  const {
    data: columns,
    error: columnError,
    isPending: columnIsPending,
  } = useColumns(id ?? '');
  const {
    data: tasks,
    error: tasksError,
    isPending: tasksIsPending,
  } = useTasks(id ?? '');
  if (!id) return <div>Board not found</div>;
  if (columnError || tasksError) return <div>Something went wrong...</div>;
  if (tasksIsPending || columnIsPending) return <div>Loading...</div>;
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
