import { http, HttpResponse } from 'msw';
import type { Board, Column, Task } from '../types';

const boardsArray: Board[] = [
  { id: '1', title: 'Work Projects', createdAt: '2024-01-15' },
  { id: '2', title: 'Personal Tasks', createdAt: '2024-02-20' },
  { id: '3', title: 'Shopping List', createdAt: '2024-03-10' },
];

const columnsArray: Column[] = [
  { id: 'col-1', boardId: '1', title: 'To Do' },
  { id: 'col-2', boardId: '1', title: 'In Progress' },
  { id: 'col-3', boardId: '1', title: 'Done' },
];

const tasksArray: Task[] = [
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

export const handlers = [
  http.get('/api/boards', () => {
    return HttpResponse.json(boardsArray);
  }),

  http.get('/api/boards/:id', ({ params }) => {
    const { id } = params;
    const board = boardsArray.find((board) => board.id === id);
    return HttpResponse.json({ ...board });
  }),

  http.get('/api/boards/:id/columns', ({ params }) => {
    const { id } = params;
    const columns = columnsArray.filter((column) => column.boardId === id);
    return HttpResponse.json(columns);
  }),

  http.get('/api/boards/:id/tasks', ({ params }) => {
    const { id } = params;
    const boardColumnIds = columnsArray
      .filter((column) => column.boardId === id)
      .map((column) => column.id);
    const tasks = tasksArray.filter((task) =>
      boardColumnIds.includes(task.columnId)
    );
    return HttpResponse.json(tasks);
  }),
  http.post('/api/boards', async ({ request }) => {
    const body = (await request.json()) as { title: string };
    const newBoard: Board = {
      id: String(boardsArray.length + 1),
      title: body.title,
      createdAt: new Date().toISOString(),
    };
    boardsArray.push(newBoard);
    columnsArray.push(
      { id: `col-${newBoard.id}-1`, boardId: newBoard.id, title: 'To Do' },
      {
        id: `col-${newBoard.id}-2`,
        boardId: newBoard.id,
        title: 'In Progress',
      },
      { id: `col-${newBoard.id}-3`, boardId: newBoard.id, title: 'Done' }
    );
    return HttpResponse.json(newBoard, { status: 201 });
  }),

  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as Omit<Task, 'id'>;
    const newTask: Task = {
      ...body,
      id: `t-${tasksArray.length + 1}`,
    };
    tasksArray.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),
];
