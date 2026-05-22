import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BoardListPage } from './pages/BoardListPage';
import { BoardPage } from './pages/BoardPage';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardListPage />,
  },
  {
    path: '/board/:id',
    element: <BoardPage />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
