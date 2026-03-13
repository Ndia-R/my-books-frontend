import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { router } from '@/routes/route';
import { HttpError } from '@/types/http';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // クライアントエラー（4xx）はリトライしない
        if (
          error instanceof HttpError &&
          [400, 401, 403, 404].includes(error.status)
        ) {
          return false;
        }
        // それ以外（500系エラー、ネットワークエラー等）は3回までリトライ
        return failureCount < 3;
      },
    },
    mutations: {
      // ミューテーションは基本的にリトライしない（冪等性が保証されていないため）
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
