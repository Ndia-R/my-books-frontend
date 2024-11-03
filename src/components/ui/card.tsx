import { cn } from '@/lib/util';
import { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-foreground/10 bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
