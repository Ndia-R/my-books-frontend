import Menu from '@/components/layout/menu';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import UserIconButton from '@/components/layout/user-icon-button';
import SearchInput from '@/components/shared/search-input';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => login(location.pathname + location.search)}
                    >
                      ログイン
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>ログイン or 新規登録する</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
