import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router';

type Props = HTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function NavigateLink({
  href,
  className,
  children,
  ...props
}: Props) {
  const linkBaseStyles = [
    'group w-full',
    'inline-flex shrink-0 items-center justify-center gap-2',
    'rounded-md text-sm font-medium whitespace-nowrap',
    'transition-all outline-none',
    'h-9 px-4 py-2 has-[>svg]:px-3',
  ].join(' ');

  const linkFocusStyles = [
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  ].join(' ');

  const linkInvalidStyles = [
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',
  ].join(' ');

  const linkDisabledStyles = [
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' ');

  const linkSvgStyles = [
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class="size-"])]:size-4',
  ].join(' ');

  const underlineStyles = [
    '[&>*]:after:bg-primary [&>*]:relative [&>*]:inline-block',
    '[&>*]:after:absolute [&>*]:after:-bottom-1 [&>*]:after:left-0',
    '[&>*]:after:h-0.5 [&>*]:after:w-0',
    '[&>*]:after:transition-all [&>*]:after:duration-300',
    'group-hover:[&>*]:after:w-full',
  ].join(' ');

  return (
    <Link
      className={cn(
        linkBaseStyles,
        linkFocusStyles,
        linkInvalidStyles,
        linkDisabledStyles,
        linkSvgStyles
      )}
      to={href}
      {...props}
    >
      <div className={cn(underlineStyles, className)}>
        <span>{children}</span>
      </div>
    </Link>
  );
}
