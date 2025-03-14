import { LOGO_TITLE } from '@/constants/constants';
import { cn } from '@/lib/util';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disableLink?: boolean;
  onClick?: () => void;
};

export default function Logo({
  className,
  size = 'md',
  disableLink = false,
  onClick,
}: Props) {
  const SIZE = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <h1 className={className}>
      <Link
        to="/"
        className={cn(
          "select-none whitespace-nowrap font-['Alfa_Slab_One'] tracking-tighter text-primary",
          'px-4 py-2 ',
          disableLink && 'cursor-default pointer-events-none',
          SIZE[size]
        )}
        aria-disabled={disableLink}
        onClick={onClick}
      >
        {LOGO_TITLE}
      </Link>
    </h1>
  );
}
