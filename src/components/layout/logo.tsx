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
    lg: 'text-5xl',
  };

  return (
    <div className="text-primary hover:bg-transparent hover:text-primary/80">
      <Link to="/">
        <h1
          className={cn(
            "font-['Alfa_Slab_One'] tracking-tighter whitespace-nowrap",
            SIZE[size]
          )}
        >
          {LOGO_TITLE}
        </h1>
      </Link>
    </div>
  );
}
