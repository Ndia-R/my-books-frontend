import { cn } from '@/lib/util';
import { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
  );
};

export { Skeleton };
