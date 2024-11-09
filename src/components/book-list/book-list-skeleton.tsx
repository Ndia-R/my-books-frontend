import Card from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FETCH_BOOKS_MAX_RESULTS } from '@/lib/data';

type Props = {
  paginationOff?: boolean;
};

export default function BookListSkeleton({ paginationOff = false }: Props) {
  return (
    <>
      <div className="flex flex-col gap-y-4 pb-4">
        {!paginationOff && (
          <div className="flex justify-center">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        )}

        <ul className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array<number>(FETCH_BOOKS_MAX_RESULTS)].map((_, index) => (
            <li key={index}>
              <Card className="flex w-40 flex-col items-center gap-2 px-3 pb-2 pt-6 sm:w-48 sm:px-4 sm:pb-2 sm:pt-4">
                <Skeleton className="z-0 h-44 w-32 rounded object-cover sm:h-52 sm:w-36" />
                <div className="flex w-full items-center justify-between">
                  <Skeleton className="h-3 w-16 rounded-lg" />
                  <Skeleton className="size-8 rounded-full" />
                </div>
                <Skeleton className="mb-3 h-5 w-4/5 rounded-full sm:mb-4 sm:h-6" />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
