import { ColumnList } from '../features/tasks/components/ColumnList';
import { CardDetailModal } from '../features/tasks/components/CardDetailModal';
import { useColumns } from '../features/boards/hooks/useColumns';
import { useParams } from 'react-router-dom';
import { useTasks } from '../features/boards/hooks/useTasks';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import {
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
} from '@dnd-kit/core';
import { useDragStore } from '../features/tasks/store/dragStore';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { Task } from '../types';

const BoardPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );
  const activePriority = searchParams.get('priority');
  const queryClient = useQueryClient();
  const setDraggedTaskId = useDragStore((state) => state.setDraggedTaskId);
  const filterButtons = (priority: string | null) =>
    `px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
      activePriority === priority
        ? 'bg-violet-600 text-white'
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;
  const handleDragStart = (event: DragStartEvent) => {
    setDraggedTaskId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const taskId = event.active.id as string;
    const newColumnId = event.over?.id as string | undefined;
    if (!newColumnId) {
      setDraggedTaskId(null);
      return;
    }
    queryClient.setQueryData<Task[]>(['boards', id, 'tasks'], (old) => {
      if (!old) return old;
      return old.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      );
    });
    setDraggedTaskId(null);
  };
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
  const filteredTasks = activePriority
    ? tasks.filter((task) => task.priority === activePriority)
    : tasks;
  return (
    <main className="px-4 py-6 mx-auto max-w-7xl md:px-6 flex flex-col gap-4">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold text-white">Work Projects</h1>
        <div className="flex items-center gap-2">
          <button
            className={filterButtons(null)}
            onClick={() => setSearchParams({})}
          >
            All
          </button>
          <button
            className={filterButtons('high')}
            onClick={() => setSearchParams({ priority: 'high' })}
          >
            High
          </button>
          <button
            className={filterButtons('medium')}
            onClick={() => setSearchParams({ priority: 'medium' })}
          >
            Medium
          </button>
          <button
            className={filterButtons('low')}
            onClick={() => setSearchParams({ priority: 'low' })}
          >
            Low
          </button>
        </div>
      </header>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ColumnList
          columns={columns}
          tasks={filteredTasks}
          onTaskClick={(taskId) => {
            const params = new URLSearchParams(searchParams);
            params.set('cardId', taskId);
            setSearchParams(params);
          }}
        />
      </DndContext>
      <CardDetailModal tasks={tasks} />
    </main>
  );
};

export { BoardPage };
