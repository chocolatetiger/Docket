import { createPortal } from 'react-dom';
import { useCreateTask } from '../../boards/hooks/useCreateTask';
import type { Priority } from '../../../types';
import { useState } from 'react';

interface AddCardFormProps {
  boardId: string;
  columnId: string;
  order: number;
  onClose: () => void;
}
const AddCardForm = ({
  boardId,
  columnId,
  onClose,
  order,
}: AddCardFormProps) => {
  const { mutate, isPending } = useCreateTask(boardId);
  const [priority, setPriority] = useState<Priority>('low');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);

  const onFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, description, priority, dueDate, order, columnId });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add card</h2>
          <button
            className="text-gray-400 hover:text-white transition-colors text-xl"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={onFormSubmission}>
          <input
            type="text"
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <input
            type="date"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
            value={dueDate ?? ''}
            placeholder="Due date"
            onChange={(e) => {
              const value = e.target.value;
              setDueDate(value === '' ? null : value);
            }}
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors duration-200"
            >
              {isPending ? 'Adding...' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export { AddCardForm };
