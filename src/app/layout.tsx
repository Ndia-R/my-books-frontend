import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ConfirmDialog from '@/components/shared/confirm-dialog';
import { Toaster } from '@/components/ui/sonner';
import { Outlet, ScrollRestoration } from 'react-router';

export default function Layout() {
  return (
    <>
      <div
        className="fixed inset-0 -z-50 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, var(--primary), transparent 50%)`,
        }}
      />
      <div className="min-h-dvh">
        <Header className="sticky top-0 z-50 w-full" />
        <main className="mx-auto max-w-7xl px-3 sm:px-6">
          <Outlet />
        </main>
        <Footer className="sticky top-full" />
      </div>
      <Toaster richColors position="bottom-center" />
      <ConfirmDialog />
      <ScrollRestoration />
    </>
  );
}
