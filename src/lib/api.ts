const BASE_URL = '/api';

const api = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export { api };
