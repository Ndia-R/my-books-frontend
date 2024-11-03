import NavList from '@/components/layout/nav-list';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import SearchBar from '@/components/search-bar';
import { cn } from '@/lib/util';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  return (
    <header className={cn('w-full bg-background/30 backdrop-blur-lg', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex h-16 w-full items-center sm:gap-x-2">
          <NavList />
          <span className="flex-1"></span>
          <SearchBar />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
