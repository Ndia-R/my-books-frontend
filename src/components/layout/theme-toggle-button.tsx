import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const body = document.querySelector('body');
    if (body?.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    const body = document.querySelector('body');
    body?.classList.toggle('light');
    body?.classList.toggle('dark');
  };

  return (
    <Button className="rounded-full" variant="ghost" size="icon" onClick={handleClick}>
      {theme === 'light' ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </Button>
  );
}
