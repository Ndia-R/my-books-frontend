import { AuthProvider } from '@/app/providers/auth-provider';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { router } from '@/app/routes/router';
import { HttpError } from '@/shared/api/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import './styles/index.css';

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

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
