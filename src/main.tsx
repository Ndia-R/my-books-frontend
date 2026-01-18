import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { router } from '@/routes/route';
import { HttpError } from '@/types/infrastructure/http';
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
        // 401エラーはリトライしない（ログイン画面にリダイレクト済み）
        if (error instanceof HttpError && error.status === 401) {
          return false;
        }

        // 403 Forbidden もリトライしない（権限不足は再試行しても解決しない）
        if (error instanceof HttpError && error.status === 403) {
          return false;
        }

        // 404 Not Found もリトライしない（リソースが存在しないため）
        if (error instanceof HttpError && error.status === 404) {
          return false;
        }

        // 400 Bad Request もリトライしない（リクエストが不正なため）
        if (error instanceof HttpError && error.status === 400) {
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
