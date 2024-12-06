import { Button } from '@/components/ui/button';
import { LOGO_TITLE } from '@/constants/constants';
import { cn } from '@/lib/util';
import { Link } from 'react-router-dom';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export default function Logo({ size = 'md' }: Props) {
  const SIZE = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl h-20',
  };

  return (
    <Button
      className={cn(
        'flex items-center justify-center text-primary hover:bg-transparent hover:text-primary/80',
        SIZE[size]
      )}
      variant="ghost"
      asChild
    >
      <Link to="/">
        <h1 className="whitespace-nowrap font-['Alfa_Slab_One'] tracking-tighter">
          {LOGO_TITLE}
        </h1>
      </Link>
    </Button>
  );
}
