import { TITLE_LOGO } from '@/shared/config/constants';
import { cn } from '@/shared/lib/cn';
import { buttonVariants } from '@/shared/ui/button';
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
        'text-primary font-title bg-transparent px-0 tracking-tighter whitespace-nowrap select-none hover:bg-transparent dark:hover:bg-transparent',
        disableLink && 'pointer-events-none cursor-default',
        SIZE[size],
        className
      )}
      to={disableLink ? '#' : '/'}
      aria-label="トップページへ移動"
      aria-disabled={disableLink}
      onClick={disableLink ? undefined : onClick}
    >
      {TITLE_LOGO}
    </Link>
  );
}
