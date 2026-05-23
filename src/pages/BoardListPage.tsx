import { Link } from 'react-router-dom';
import type { Board } from '../types';
import { formatDate } from '../lib/utils';

const boards: Board[] = [
  { id: '1', title: 'Work Projects', createdAt: '2024-01-15' },
  { id: '2', title: 'Personal Tasks', createdAt: '2024-02-20' },
  { id: '3', title: 'Shopping List', createdAt: '2024-03-10' },
];

const BoardListPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Boards</h1>
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <Link
            className="block no-underline"
            key={board.id}
            to={`/board/${board.id}`}
          >
            <div
              className="bg-gray-900 
          border border-gray-800 
          rounded-xl p-5 
          hover:bg-gray-800 
          hover:border-gray-700 
          hover:-translate-y-1 
          hover:shadow-xl
          transition-all duration-200
          cursor-pointer"
            >
              <div className="text-white font-semibold text-lg">
                {board.title}
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {formatDate(board.createdAt)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { BoardListPage };
