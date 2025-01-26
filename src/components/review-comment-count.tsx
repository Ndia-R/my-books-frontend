import CountUpNumber from '@/components/count-up-number';
import { getReviewRatingInfo } from '@/lib/data';
import { cn } from '@/lib/util';
import { useQuery } from '@tanstack/react-query';
import { MessageSquareIcon } from 'lucide-react';

const BUTTON_SIZE = { sm: 'size-6', md: 'size-8' };
const ICON_SIZE = { sm: 'size-3', md: 'size-4' };
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm' };

type Props = {
  bookId: string;
  size?: 'sm' | 'md';
  animation?: boolean;
};

export default function ReviewCommentCount({
  bookId,
  size = 'md',
  animation = false,
}: Props) {
  const queryKey = ['getReviewRatingInfo', bookId];
  const { data: reviewRatingInfo } = useQuery({
    queryKey,
    queryFn: () => getReviewRatingInfo(bookId),
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
        {animation ? (
          <CountUpNumber end={reviewRatingInfo?.reviewCount || 0} />
        ) : (
          reviewRatingInfo?.reviewCount
        )}
      </p>
    </div>
  );
}
