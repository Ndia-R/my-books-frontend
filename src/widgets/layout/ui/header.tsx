import Menu from '@/widgets/layout/ui/menu';
import ThemeToggleButton from '@/widgets/layout/ui/theme-toggle-button';
import UserIconButton from '@/widgets/layout/ui/user-icon-button';
import SearchInput from '@/features/book-search/ui/search-input';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import { useAuth } from '@/app/providers/auth-provider';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();

  return (
    <header className={cn('backdrop-blur-sm', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <div className="flex h-16 w-full items-center justify-between sm:gap-x-2">
            <Menu />
            <div className="flex sm:gap-x-2">
              <SearchInput />
              <ThemeToggleButton />

              {isAuthenticated ? (
                <UserIconButton />
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => login(location.pathname + location.search)}
                >
                  ログイン
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
