import { buttonVariants } from '@/components/ui/button';
import { TITLE_LOGO } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

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
    <Link
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'text-primary font-logo bg-transparent tracking-tighter whitespace-nowrap select-none hover:bg-transparent dark:hover:bg-transparent',
        disableLink && 'pointer-events-none cursor-default',
        SIZE[size],
        className
      )}
      to="/"
      aria-label="タイトルロゴ"
      aria-disabled={disableLink}
      onClick={onClick}
    >
      {TITLE_LOGO}
    </Link>
  );
}
