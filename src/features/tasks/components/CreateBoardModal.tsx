import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCreateBoard } from '../../boards/hooks/useCreateBoard';
interface CreateBoardModalProps {
  onClose: () => void;
}
const CreateBoardModal = ({ onClose }: CreateBoardModalProps) => {
  const [title, setTitle] = useState('');
  const { mutate, isPending } = useCreateBoard();
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate(title);
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create Board</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            x
          </button>
        </div>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors duration-200"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export { CreateBoardModal };
