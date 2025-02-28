import BookList from '@/components/book-list/book-list';
import BookPagination from '@/components/book-list/book-pagination';
import { useApiBook } from '@/hooks/api/use-api-book';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  genreIdsQuery: string;
  conditionQuery: string;
  page: number;
};

export default function BookListByGenreId({
  genreIdsQuery,
  conditionQuery,
  page,
}: Props) {
  const { getBookPageByGenreId } = useApiBook();

  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getBookPageByGenreId', genreIdsQuery, conditionQuery, page],
    queryFn: () => getBookPageByGenreId(genreIdsQuery, conditionQuery, page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="ml-1 mr-4 text-sm text-muted-foreground">件</span>
      </p>
      <BookList books={bookPage.books} />
      <BookPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
