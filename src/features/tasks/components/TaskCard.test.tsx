import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from './TaskCard';
import type { Task } from '../../../types';

const mockTask: Task = {
  id: 't-1',
  columnId: 'col-1',
  title: 'Fix login bug',
  description: 'This is a description',
  priority: 'high',
  dueDate: '2024-03-15',
  order: 1,
};

describe('TaskCard', () => {
  it('renders the task title', () => {
    render(<TaskCard task={mockTask} onTaskClick={vi.fn()} />);
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
  });

  it('renders the priority bade', () => {
    render(<TaskCard task={mockTask} onTaskClick={vi.fn()} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });
  it('renders the due date', () => {
    render(<TaskCard task={mockTask} onTaskClick={vi.fn()} />);
    expect(screen.getByText('Mar 15, 2024')).toBeInTheDocument();
  });
  it('calls onTaskClick with task id when clicked', async () => {
    const onTaskClick = vi.fn();
    render(<TaskCard task={mockTask} onTaskClick={onTaskClick} />);
    await userEvent.click(screen.getByText('Fix login bug'));
    expect(onTaskClick).toHaveBeenCalledWith('t-1');
  });
  it('renders No date when dueDate is null', () => {
    const taskWithNoDueDate = { ...mockTask, dueDate: null };
    render(<TaskCard task={taskWithNoDueDate} onTaskClick={vi.fn()} />);
    expect(screen.getByText('No date')).toBeInTheDocument();
  });
});
