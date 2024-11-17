import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div className="min-h-dvh">
        <Header className="fixed z-50" />
        <main className="mx-auto max-w-7xl px-3 pt-16 sm:px-6">
          <Outlet />
        </main>
        <Footer className="sticky top-full" />
      </div>
      <Toaster />
    </>
  );
}
