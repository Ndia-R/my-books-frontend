import ReviewList from '@/components/reviews/book-review-list';
import ReviewCreateDialog from '@/components/reviews/review-create-dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOAST_ERROR_DURATION } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { getBookReviews } from '@/lib/api/books';
import { createReview } from '@/lib/api/review';
import { isReviewedByUser } from '@/lib/api/user';
import { useAuth } from '@/providers/auth-provider';
import { Review, ReviewRequest } from '@/types';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  bookId: string;
};

export default function BookReviews({ bookId }: Props) {
  const { data: firstPage } = useSuspenseQuery({
    queryKey: queryKeys.getBookReviews(bookId, 1),
    queryFn: () => getBookReviews(bookId, 1),
  });

  const [reviews, setReviews] = useState<Review[]>(firstPage.data);
  const [currentPage, setCurrentPage] = useState(firstPage.currentPage);
  const [hasNext, setHasNext] = useState(firstPage.hasNext);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // ログインしていない場合は、enabledオプションを指定してqueryFnを呼び出さないようにする
  const { data: review } = useQuery({
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
        queryKey: queryKeys.getBookReviews(bookId, 1),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.isReviewedByUser(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getBookDetails(bookId),
      });
    },
  });

  const loadMore = async () => {
    if (isLoading || !hasNext) return;

    setIsLoading(true);
    try {
      const newPage = await getBookReviews(bookId, currentPage + 1);
      setReviews((prevReviews) => [...prevReviews, ...newPage.data]);
      setCurrentPage(newPage.currentPage);
      setHasNext(newPage.hasNext);
    } catch {
      toast.error('レビューの読み込みに失敗しました', {
        duration: TOAST_ERROR_DURATION,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full pb-4 lg:w-3/4">
        <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
          <p className="space-x-1">
            <span className="text-muted-foreground">レビュー</span>
            <span className="text-lg font-semibold sm:text-xl">
              {firstPage.totalItems}
            </span>
            <span className="text-muted-foreground text-sm">件</span>
          </p>
          {isAuthenticated ? (
            <Button
              className="w-44 bg-transparent"
              variant="outline"
              disabled={!!review}
              onClick={() => setIsOpen(true)}
            >
              {review ? 'レビュー済み' : 'レビューする'}
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="hover:border-primary/50 w-44 cursor-default bg-transparent opacity-50 hover:bg-transparent"
                  variant="outline"
                >
                  レビューする
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                ログインしてこの本の「レビュー」を書きましょう
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <ReviewList reviews={reviews} />

        {hasNext && (
          <div className="flex justify-center">
            <Button
              className="text-muted-foreground w-44"
              variant="ghost"
              disabled={isLoading}
              onClick={loadMore}
            >
              {isLoading ? (
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
        page={currentPage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createMutation={createMutation}
      />
    </>
  );
}
