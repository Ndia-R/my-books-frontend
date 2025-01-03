import LoginButton from '@/components/layout/login-button';
import NavList from '@/components/layout/nav-list';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import SearchInput from '@/components/search-input';
import { cn } from '@/lib/util';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  return (
    <header
      className={cn('w-screen max-w-full bg-background/30 backdrop-blur-lg', className)}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="animate-fadeInDown-4">
          <div className="flex h-16 w-full items-center sm:gap-x-2">
            <NavList />
            <span className="flex-1"></span>
            <SearchInput />
            <LoginButton />
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
