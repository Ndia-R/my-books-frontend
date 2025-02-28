import NavList from '@/components/layout/nav-list';
import SearchInput from '@/components/layout/search-input';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import UserIconButton from '@/components/layout/user-icon-button';
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
        <div className="delay-0 duration-500 animate-in fade-in-0 slide-in-from-top-10 fill-mode-both">
          <div className="flex h-16 w-full items-center sm:gap-x-2">
            <NavList />
            <span className="flex-1"></span>
            <SearchInput />
            <UserIconButton />
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
