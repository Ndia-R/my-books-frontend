import ConfirmDialog from '@/components/shared/confirm-dialog';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import { Outlet, ScrollRestoration } from 'react-router';

export default function Layout() {
  return (
    <>
      <div className="from-primary/10 via-background to-primary/15 fixed inset-0 -z-50 min-h-dvh bg-linear-to-tr via-80%"></div>

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
