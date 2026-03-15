import { bookQueryKeys, getBookReviews } from '@/entities/book';
import {
  createReview,
  deleteReview,
  isReviewedByUser,
  ReviewList,
  reviewQueryKeys,
  updateReview,
  type Review,
  type ReviewPage,
  type ReviewRequest,
  type ReviewUpdateParams,
} from '@/entities/review';
import { useAuth } from '@/entities/user';
import { ReviewCreateDialog, ReviewUpdateDialog } from '@/features/review';
import { Role } from '@/shared/config/roles';
import { SubscriptionPlan } from '@/shared/config/subscription-plans';
import { Button } from '@/shared/ui/button';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { Loader2Icon, SquarePenIcon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  bookId: string;
};

function ReviewEditAction({ review }: { review: Review }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: bookQueryKeys.getBookReviewsInfinite(review.book.id),
    });
    queryClient.invalidateQueries({
      queryKey: reviewQueryKeys.isReviewedByUser(review.book.id),
    });
    queryClient.invalidateQueries({
      queryKey: bookQueryKeys.getBookDetails(review.book.id),
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

export default function BookReviews({ bookId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: bookQueryKeys.getBookReviewsInfinite(bookId),
      queryFn: ({ pageParam }) => getBookReviews(bookId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const reviews = data.pages.flatMap((page) => page.data);

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, userProfile, hasRole, hasPlan } = useAuth();
  const canReview = hasRole(Role.USER) && hasPlan(SubscriptionPlan.PREMIUM);
  const canEditReview = hasRole(Role.USER) && hasPlan(SubscriptionPlan.PREMIUM);

  // すでにレビューをしているかどうかを取得
  // ログインしていない場合は、enabledオプションを指定してqueryFnを呼び出さないようにする
  const { data: isReviewed } = useQuery({
    queryKey: reviewQueryKeys.isReviewedByUser(bookId),
    queryFn: () => isReviewedByUser(bookId),
    enabled: isAuthenticated,
    retry: false,
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (requestBody: ReviewRequest) => createReview(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookQueryKeys.getBookReviewsInfinite(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.isReviewedByUser(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: bookQueryKeys.getBookDetails(bookId),
      });
    },
  });

  return (
    <>
      <div className="mx-auto w-full pb-4 lg:w-3/4">
        <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
          <div className="flex-1"></div>
          <div className="flex flex-1 justify-center">
            {canReview && (
              <Button
                className="w-44 bg-transparent"
                variant="outline"
                disabled={isReviewed}
                onClick={() => setIsOpen(true)}
              >
                {isReviewed ? 'レビュー済み' : 'レビューする'}
              </Button>
            )}
          </div>
          <div className="flex flex-1 justify-end">
            <p className="space-x-1 sm:mr-2">
              <span className="text-muted-foreground">レビュー</span>
              <span className="text-lg font-semibold sm:text-xl">
                {totalItems}
              </span>
              <span className="text-muted-foreground text-sm">件</span>
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="flex h-32 items-center justify-center">
            <p>まだレビューはありません</p>
          </div>
        ) : (
          <ReviewList
            reviews={reviews}
            getIsOwnReview={(review) => userProfile?.id === review.userId}
            renderAction={(review) => {
              const isOwnReview = userProfile?.id === review.userId;
              return isOwnReview && canEditReview ? (
                <ReviewEditAction review={review} />
              ) : null;
            }}
          />
        )}

        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              className="text-muted-foreground w-44"
              variant="ghost"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? (
                <Loader2Icon
                  className="animate-spin"
                  aria-label="レビューを読み込み中"
                />
              ) : (
                'もっと見る'
              )}
            </Button>
          </div>
        )}
      </div>

      <ReviewCreateDialog
        bookId={bookId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createMutation={createMutation}
      />
    </>
  );
}
