import { BOOK_IMAGE_BASE_URL } from '@/constants/constants';
import { queryKeys } from '@/constants/query-keys';
import { getBookDetails } from '@/lib/api/books';
import { useSuspenseQuery } from '@tanstack/react-query';

type Props = {
  bookId: string;
};

export default function BookReadBackground({ bookId }: Props) {
  const { data: book } = useSuspenseQuery({
    queryKey: queryKeys.getBookDetails(bookId),
    queryFn: () => getBookDetails(bookId),
  });

  return (
    <div className="fixed inset-0 -z-10 flex justify-center">
      <img
        className="w-full max-w-7xl object-cover opacity-5"
        src={BOOK_IMAGE_BASE_URL + book.imagePath}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
