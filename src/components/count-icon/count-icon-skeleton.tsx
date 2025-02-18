import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/util';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };

type Props = {
  size?: 'sm' | 'md';
};

export default function CountIconSkeleton({ size = 'md' }: Props) {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          'rounded-full text-muted-foreground flex justify-center items-center',
          BUTTON_SIZE[size]
        )}
      >
        <Skeleton className={cn('rounded-full bg-muted-foreground/5', ICON_SIZE[size])} />
      </div>

      <div className="flex min-w-4 justify-center text-muted-foreground">
        <Skeleton className={cn('rounded-full bg-muted-foreground/5', ICON_SIZE[size])} />
      </div>
    </div>
  );
}
