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
  // 子要素を分割
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === CardContent
  );

  return (
    <div
      className={cn(
        'rounded-lg border border-foreground/10 bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {content}
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
