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

  const LOGO = (
    <h1
      className={cn(
        "whitespace-nowrap font-['Alfa_Slab_One'] tracking-tighter text-primary px-4 py-2 select-none",
        disableLink && 'cursor-default',
        SIZE[size]
      )}
    >
      {LOGO_TITLE}
    </h1>
  );

  if (disableLink) return LOGO;

  return <Link to="/">{LOGO}</Link>;
}
