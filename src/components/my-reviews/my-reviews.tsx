import MyReviewList from '@/components/my-reviews/my-review-list';
import SearchPagination from '@/components/search-pagination';
import { useSearchFilters } from '@/hooks/use-search-filters';
import {
  deleteReview,
  getReviewPageByUser,
  updateReview,
} from '@/lib/api/review';
import { ReviewRequest } from '@/types';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

type Props = {
  page: number;
};

export default function MyReviews({ page }: Props) {
  const { updateQueryParams } = useSearchFilters();
  const queryClient = useQueryClient();

  const { data: reviewPage } = useSuspenseQuery({
    queryKey: ['getReviewPageByUser', page],
    queryFn: () => getReviewPageByUser(page),
  });

  const onError = (error: Error) => {
    console.error(error);
  };

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      requestBody,
    }: {
      id: number;
      requestBody: ReviewRequest;
    }) => updateReview(id, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getReviewPageByUser', page],
      });
    },
    onError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      // ２ページ以降で、そのページの最後の１つを削除した場合は、１ページ戻る
      if (page >= 2 && reviewPage.reviews.length === 1) {
        queryClient.invalidateQueries({
          queryKey: ['getBookmarkPage', page - 1],
        });
        updateQueryParams({ page: page - 1 });
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ['getReviewPageByUser', page],
      });
    },
    onError,
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {reviewPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <MyReviewList
        reviews={reviewPage.reviews}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
      <SearchPagination totalPages={reviewPage.totalPages} />
    </div>
  );
}
