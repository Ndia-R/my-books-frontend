import LoginButton from '@/components/layout/login-button';
import NavList from '@/components/layout/nav-list';
import ThemeToggleButton from '@/components/layout/theme-toggle-button';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { refreshAccessToken, validateToken } from '@/lib/auth';
import { cn } from '@/lib/util';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const handleClick = async () => {
    const accessToken = await refreshAccessToken();
    console.log(accessToken);
  };
  const handleClickVt = async () => {
    const isValid = await validateToken();
    console.log({ isValid });
  };
  return (
    <header className={cn('w-full bg-background/30 backdrop-blur-lg', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex h-16 w-full items-center sm:gap-x-2">
          <NavList />
          <span className="flex-1"></span>
          <SearchBar />
          <Button onClick={handleClick}>RF</Button>
          <Button onClick={handleClickVt}>VT</Button>
          <LoginButton />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
