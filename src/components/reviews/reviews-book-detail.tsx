import ReviewCreateDialog from '@/components/reviews/review-create-dialog';
import ReviewList from '@/components/reviews/review-list';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useApiReview } from '@/hooks/api/use-api-review';
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

type Props = {
  bookId: string;
};

export default function ReviewsBookDetail({ bookId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const {
    getReviewPage,
    checkSelfReviewExists,
    createReview,
    updateReview,
    deleteReview,
  } = useApiReview();

  const { data: initialReviewPage } = useSuspenseQuery({
    queryKey: ['getReviewPage', bookId, 1],
    queryFn: () => getReviewPage(bookId, 1),
  });

  // ログインしていない場合は、enabledオプションを指定して
  // queryFnを呼び出さないようにする（この指定はuseSuspenseQueryでは出来ない模様）
  const { data: reviewExists = false } = useQuery({
    queryKey: ['checkSelfReviewExists', bookId],
    queryFn: () => checkSelfReviewExists(bookId),
    enabled: !!user,
    retry: false,
  });

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['getReviewPage', bookId, 1] });
    queryClient.invalidateQueries({ queryKey: ['getBookDetailsById', bookId] });
    queryClient.invalidateQueries({
      queryKey: ['checkSelfReviewExists', bookId],
    });
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const createMutation = useMutation({
    mutationFn: (requestBody: ReviewRequest) => createReview(requestBody),
    onSuccess,
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: number;
      requestBody: ReviewRequest;
    }) => updateReview(id, requestBody),
    onSuccess,
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (initialReviewPage) {
      setCurrentPage(1);
      setReviews(initialReviewPage.reviews);
      setTotalPages(initialReviewPage.totalPages);
    }
  }, [initialReviewPage]);

  const loadMoreReviews = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    const nextReviewPage = await getReviewPage(bookId, nextPage);
    setReviews((prevReviews) => [...prevReviews, ...nextReviewPage.reviews]);
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  return (
    <>
      <div className="mx-auto w-full pb-4 lg:w-3/4">
        <div className="flex flex-col-reverse items-center justify-end gap-y-4 sm:flex-row sm:gap-x-4 sm:px-6">
          <p>レビュー {initialReviewPage.totalItems} 件</p>
          {user ? (
            <Button
              className="w-44 rounded-full bg-transparent"
              variant="outline"
              disabled={reviewExists}
              onClick={() => user && setIsOpen(true)}
            >
              {reviewExists ? 'レビュー済み' : 'レビューする'}
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="hover:border-primary/50 w-44 cursor-default rounded-full bg-transparent opacity-50 hover:bg-transparent"
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

        <ReviewList
          reviews={reviews}
          updateMutation={updateMutation}
          deleteMutation={deleteMutation}
        />

        {currentPage < totalPages && (
          <div className="flex justify-center">
            <Button
              className="text-muted-foreground w-44 rounded-full"
              variant="ghost"
              disabled={isLoading}
              onClick={loadMoreReviews}
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
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
