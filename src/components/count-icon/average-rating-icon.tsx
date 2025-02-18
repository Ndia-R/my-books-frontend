import { cn } from '@/lib/util';
import { StarIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type Props = {
  averageRating: number;
  size?: 'sm' | 'md';
};

export default function AverageRatingIcon({ averageRating, size = 'md' }: Props) {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          'rounded-full text-muted-foreground flex justify-center items-center',
          BUTTON_SIZE[size]
        )}
      >
        <StarIcon className={ICON_SIZE[size]} />
      </div>

      <p
        className={cn(
          'flex min-w-4 text-muted-foreground justify-center',
          TEXT_SIZE[size]
        )}
      >
        {averageRating.toFixed(1)}
      </p>
    </div>
  );
}
