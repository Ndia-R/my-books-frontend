import { usePrefetchBook } from '@/entities/book';
import {
  deleteReview,
  getUserReviews,
  MyReviewList,
  reviewQueryKeys,
  updateReview,
  type Review,
  type ReviewPage,
  type ReviewUpdateParams,
} from '@/entities/review';
import { ReviewUpdateDialog } from '@/features/review';
import { Button } from '@/shared/ui/button';
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { Loader2Icon, SquarePenIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ReviewEditAction({ review }: { review: Review }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: reviewQueryKeys.getUserReviewsInfinite(),
    });
  };

  const updateMutation = useMutation({
    mutationFn: ({ reviewId, requestBody }: ReviewUpdateParams) =>
      updateReview(reviewId, requestBody),
    onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess,
  });

  return (
    <>
      <Button
        className="text-muted-foreground size-8"
        variant="ghost"
        size="icon"
        aria-label="レビューを編集"
        onClick={() => setIsOpen(true)}
      >
        <SquarePenIcon />
      </Button>
      <ReviewUpdateDialog
        review={review}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </>
  );
}

export default function MyReviews() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: reviewQueryKeys.getUserReviewsInfinite(),
      queryFn: ({ pageParam }) => getUserReviews(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const reviews = data.pages.flatMap((page) => page.data);

  const { prefetchBookDetail } = usePrefetchBook();

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

      {reviews.length === 0 ? (
        <div className="flex h-32 items-center justify-center">
          <p>まだレビューはありません</p>
        </div>
      ) : (
        <MyReviewList
          reviews={reviews}
          onItemPrefetch={(review) => prefetchBookDetail(review.book.id)}
          renderAction={(review) => <ReviewEditAction review={review} />}
        />
      )}

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
