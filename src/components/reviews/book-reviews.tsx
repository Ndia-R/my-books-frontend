import BookReviewList from '@/components/reviews/book-review-list';
import ReviewCreateDialog from '@/components/reviews/review-create-dialog';
import { Button } from '@/components/ui/button';
import { PermissionSet } from '@/constants/permission-sets';
import { queryKeys } from '@/constants/query-keys';
import { getBookReviews } from '@/lib/api/books';
import { createReview } from '@/lib/api/reviews';
import { isReviewedByUser } from '@/lib/api/users';
import { useAuth } from '@/providers/auth-provider';
import type { ReviewPage, ReviewRequest } from '@/types/review';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

type Props = {
  bookId: string;
};

export default function BookReviews({ bookId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.getBookReviewsInfinite(bookId),
      queryFn: ({ pageParam }) => getBookReviews(bookId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    });

  const totalItems = data.pages[0].totalItems;
  const reviews = data.pages.flatMap((page) => page.data);

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, hasPermissionSet } = useAuth();
  const canReview = hasPermissionSet(PermissionSet.PremiumUser);

  // すでにレビューをしているかどうかを取得
  // ログインしていない場合は、enabledオプションを指定してqueryFnを呼び出さないようにする
  const { data: isReviewed } = useQuery({
    queryKey: queryKeys.isReviewedByUser(bookId),
    queryFn: () => isReviewedByUser(bookId),
    enabled: isAuthenticated,
    retry: false,
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (requestBody: ReviewRequest) => createReview(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getBookReviewsInfinite(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.isReviewedByUser(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getBookDetails(bookId),
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

        <BookReviewList reviews={reviews} />

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
