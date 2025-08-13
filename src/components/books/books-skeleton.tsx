import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_BOOKS_SIZE } from '@/constants/constants';

type Props = {
  withPagination?: boolean;
};

export default function BooksSkeleton({ withPagination = true }: Props) {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      {withPagination && <div className="h-20 sm:h-9" />}
      <div className="grid grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array<number>(DEFAULT_BOOKS_SIZE)].map((_, index) => (
          <article key={index}>
            <Card className="border-card-foreground/5 bg-card/70 px-2 py-3 sm:px-3 sm:py-4">
              <CardContent className="flex w-38 flex-col items-center gap-y-0 p-0 sm:w-44">
                <Skeleton
                  className="bg-muted-foreground/5 mb-1 h-44 w-32 rounded-xs object-cover sm:mb-0 sm:h-52 sm:w-36"
                  aria-label="書籍画像を読み込み中"
                />
                <div className="mb-2 flex h-10 w-full items-center justify-center sm:h-12">
                  <Skeleton
                    className="bg-muted-foreground/5 h-4 w-4/5 sm:h-5"
                    aria-label="書籍タイトルを読み込み中"
                  />
                </div>
                <div className="flex h-11 w-full flex-col items-center">
                  <Skeleton
                    className="bg-muted-foreground/5 h-3 w-24"
                    aria-label="著者情報を読み込み中"
                  />
                  <Skeleton
                    className="bg-muted-foreground/5 mt-3 h-3 w-24"
                    aria-label="評価情報を読み込み中"
                  />
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}
