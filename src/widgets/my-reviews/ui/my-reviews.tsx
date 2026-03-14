import type { ReviewPage } from '@/entities/review/model/types';
import MyReviewList from '@/entities/review/ui/my-review-list';
import { getUserReviews } from '@/entities/user/api/users';
import { queryKeys } from '@/shared/lib/query-keys';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MyReviews() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.getUserReviewsInfinite(),
      queryFn: ({ pageParam }) => getUserReviews(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const reviews = data.pages.flatMap((page) => page.data);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6 space-x-1 text-right">
        <span className="text-lg font-semibold sm:text-xl">{totalItems}</span>
        <span className="text-muted-foreground text-sm">件</span>
      </p>

      <MyReviewList reviews={reviews} />

      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          {isFetchingNextPage && (
            <Loader2Icon
              className="text-muted-foreground animate-spin"
              aria-label="レビューを読み込み中"
              role="status"
            />
          )}
        </div>
      )}
    </div>
  );
}
