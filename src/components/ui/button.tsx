import { cn } from '@/lib/util';
import { ButtonHTMLAttributes } from 'react';

const variantList = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline:
    'border border-primary/50 text-primary bg-background hover:bg-primary/20 hover:border-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'bg-transparent text-foreground hover:bg-primary/20 hover:text-primary',
};

const sizeList = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'size-10',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function Button({
  variant = 'default',
  size = 'default',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantList[variant],
        sizeList[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
