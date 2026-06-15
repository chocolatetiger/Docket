import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';
import { useBoards } from '../features/boards/hooks/useBoards';
import { useState } from 'react';
import { CreateBoardModal } from '../features/tasks/components/CreateBoardModal';

const BoardListPage = () => {
  const { data, error, isPending } = useBoards();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">My Boards</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="text-white bg-violet-600 px-4 py-2 font-medium rounded-lg  hover:bg-violet-700 text-sm transition-colors duration-200"
        >
          + New Board
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((board) => (
          <li key={board.id}>
            <Link className="block no-underline" to={`/board/${board.id}`}>
              <article
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
              </article>
            </Link>
          </li>
        ))}
      </ul>
      {isCreateModalOpen && (
        <CreateBoardModal onClose={handleCreateModalClose} />
      )}
    </div>
  );
};

export { BoardListPage };
