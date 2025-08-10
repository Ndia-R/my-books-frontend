import ReviewList from '@/components/reviews/book-review-list';
import ReviewCreateDialog from '@/components/reviews/review-create-dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  bookId: string;
};

export default function BookReviews({ bookId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const { data: initialReviewPage } = useSuspenseQuery({
    queryKey: queryKeys.book.reviews(bookId, 1),
    queryFn: () => getBookReviews(bookId, 1),
  });

  // ログインしていない場合は、enabledオプションを指定して
  // queryFnを呼び出さないようにする（この指定はuseSuspenseQueryでは出来ない模様）
  const { data: review } = useQuery({
    queryKey: queryKeys.user.isReviewedByUser(bookId),
    queryFn: () => isReviewedByUser(bookId),
    enabled: isAuthenticated,
    retry: false,
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (requestBody: ReviewRequest) => createReview(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.book.reviews(bookId, 1),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.reviewsByBookId(bookId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.book.details(bookId),
      });
    },
  });

  useEffect(() => {
    if (initialReviewPage) {
      setCurrentPage(1);
      setReviews(initialReviewPage.data);
      setTotalPages(initialReviewPage.totalPages);
    }
  }, [initialReviewPage]);

  const loadMoreReviews = async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const nextReviewPage = await getBookReviews(bookId, nextPage);
      setReviews((prevReviews) => [...prevReviews, ...nextReviewPage.data]);
      setCurrentPage(nextPage);
    } catch {
      toast.error('レビューの読み込みに失敗しました', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full pb-4 lg:w-3/4">
        <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
          <p>レビュー {initialReviewPage.totalItems} 件</p>
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

        {currentPage < totalPages && (
          <div className="flex justify-center">
            <Button
              className="text-muted-foreground w-44"
              variant="ghost"
              disabled={isLoading}
              onClick={loadMoreReviews}
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
