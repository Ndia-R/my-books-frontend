import Menu from '@/components/layout/menu';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import UserIconButton from '@/components/layout/user-icon-button';
import SearchInput from '@/components/search-input';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { Link, useLocation } from 'react-router';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <header className={cn('backdrop-blur-sm', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="animate-in fade-in-0 slide-in-from-top-10 fill-mode-both delay-0 duration-500">
          <div className="flex h-16 w-full items-center justify-between sm:gap-x-2">
            <Menu />
            <div className="flex">
              <SearchInput />

              {isAuthenticated ? (
                <UserIconButton />
              ) : (
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'rounded-full'
                  )}
                  to="/login"
                  state={{ from: location }}
                >
                  ログイン
                </Link>
              )}

              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
