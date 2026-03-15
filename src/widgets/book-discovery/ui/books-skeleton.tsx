import { BookListSkeleton } from '@/entities/book';

type Props = {
  withPagination?: boolean;
};

export default function BooksSkeleton({ withPagination = true }: Props) {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      {withPagination && <div className="h-20 sm:h-9" />}
      <BookListSkeleton />
    </div>
  );
}
