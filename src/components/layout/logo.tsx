import { LOGO_TITLE } from '@/constants/constants';
import { cn } from '@/lib/util';
import { Link } from 'react-router-dom';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  disableLink?: boolean;
};

export default function Logo({ size = 'md', disableLink = false }: Props) {
  const SIZE = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <h1>
      <Link
        to="/"
        className={cn(
          "select-none whitespace-nowrap font-['Alfa_Slab_One'] tracking-tighter text-primary",
          'px-4 py-2 ',
          disableLink && 'cursor-default pointer-events-none',
          SIZE[size]
        )}
        aria-disabled={disableLink}
      >
        {LOGO_TITLE}
      </Link>
    </h1>
  );
}
