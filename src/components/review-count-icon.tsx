import { getReviewSummary } from '@/lib/data';
import { cn } from '@/lib/util';
import { useQuery } from '@tanstack/react-query';
import { MessageSquareIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type Props = {
  bookId: string;
  size?: 'sm' | 'md';
};

export default function ReviewCountIcon({ bookId, size = 'md' }: Props) {
  const queryKey = ['getReviewSummary', bookId];
  const { data: reviewRatingInfo } = useQuery({
    queryKey,
    queryFn: () => getReviewSummary(bookId),
  });

  return (
    <div className="flex items-center">
      <div
        className={cn(
          'rounded-full text-muted-foreground flex justify-center items-center',
          BUTTON_SIZE[size]
        )}
      >
        <MessageSquareIcon className={ICON_SIZE[size]} />
      </div>

      <p
        className={cn(
          'flex min-w-4 text-muted-foreground justify-center',
          TEXT_SIZE[size]
        )}
      >
        {reviewRatingInfo?.reviewCount}
      </p>
    </div>
  );
}
