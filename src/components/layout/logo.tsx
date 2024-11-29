import { LOGO_TITLE } from '@/constants/constants';
import { cn } from '@/lib/util';
import { Link } from 'react-router-dom';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export default function Logo({ size = 'md' }: Props) {
  return (
    <div className="text-primary hover:bg-transparent hover:text-primary/80">
      <Link to="/">
        <h1
          className={cn(
            "font-['Alfa_Slab_One'] tracking-tighter whitespace-nowrap",
            size === 'sm' ? 'text-xl' : size === 'md' ? 'text-3xl' : 'text-5xl'
          )}
        >
          {LOGO_TITLE}
        </h1>
      </Link>
    </div>
  );
}
