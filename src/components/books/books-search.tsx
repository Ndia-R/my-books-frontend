import BookList from '@/components/books/book-list';
import SearchPagination from '@/components/search-pagination';
import { getBookPageByQuery } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  searchQuery: string;
  page: number;
};

export default function BooksSearch({ searchQuery, page }: Props) {
  const { data: bookPage } = useSuspenseQuery({
    queryKey: ['getBookPageByQuery', searchQuery, page],
    queryFn: () => getBookPageByQuery(searchQuery, page),
  });

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="text-right">
        {bookPage.totalItems}
        <span className="text-muted-foreground mr-4 ml-1 text-sm">件</span>
      </p>
      <BookList books={bookPage.books} />
      <SearchPagination totalPages={bookPage.totalPages} />
    </div>
  );
}
