import { cn } from '@/lib/util';
import React from 'react';

// ----------------------------------------------------------------------------
// Card
// ----------------------------------------------------------------------------
const Card = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-foreground/10 bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case CardContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </div>
  );
};

// ----------------------------------------------------------------------------
// CardContent
// ----------------------------------------------------------------------------
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {children}
      </div>
    );
  }
);

export { Card, CardContent };
