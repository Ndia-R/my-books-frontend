import Menu from '@/components/layout/menu';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import UserIconButton from '@/components/layout/user-icon-button';
import SearchInput from '@/components/shared/search-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { motion } from 'motion/react';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { isAuthenticated, login } = useAuth();

  const handleClickLogin = () => {
    login();
  };

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
                <Button variant="ghost" onClick={handleClickLogin}>
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
