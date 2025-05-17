import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ThemeStyleProvider } from '@/providers/theme-style-provider';
import { UserProvider } from '@/providers/user-provider';
import { router } from '@/routes/route.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <ThemeStyleProvider
            defaultTheme="default"
            storageKey="vite-ui-theme-style"
          >
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
            </ThemeProvider>
          </ThemeStyleProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
