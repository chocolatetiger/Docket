import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BoardListPage } from './BoardListPage';
import { server } from '../test/server';
import { http, HttpResponse } from 'msw';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('BoardListPage', () => {
  it('shows a loading state initially', () => {
    renderWithProviders(<BoardListPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders boards after loading', async () => {
    renderWithProviders(<BoardListPage />);
    expect(await screen.findByText('Work Projects')).toBeInTheDocument();
    expect(screen.getByText('Personal Tasks')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    server.use(http.get('/api/boards', () => HttpResponse.error()));
    renderWithProviders(<BoardListPage />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });
});
