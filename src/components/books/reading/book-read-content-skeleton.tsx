import { Skeleton } from '@/components/ui/skeleton';

export default function BookReadContentSkeleton() {
  return (
    <div className="flex flex-col gap-y-12 px-4 pt-12 pb-6 sm:px-20">
      <div>
        <div className="text-muted-foreground mb-2 text-sm sm:text-base">
          <Skeleton
            className="bg-muted-foreground/5 my-1 h-5 w-12"
            aria-label="章番号を読み込み中"
          />
        </div>
        <div className="flex flex-wrap items-center">
          <div className="text-xl font-bold text-wrap sm:text-2xl">
            <Skeleton
              className="bg-muted-foreground/5 h-8 w-48"
              aria-label="書籍タイトルを読み込み中"
            />
          </div>
        </div>
      </div>

      <div className="whitespace-pre-wrap">
        <Skeleton
          className="bg-muted-foreground/5 my-2 h-6 w-80"
          aria-label="書籍コンテンツを読み込み中"
        />
        <Skeleton
          className="bg-muted-foreground/5 my-2 h-6 w-96"
          aria-label="書籍コンテンツを読み込み中"
        />
        <Skeleton
          className="bg-muted-foreground/5 my-2 h-6 w-64"
          aria-label="書籍コンテンツを読み込み中"
        />
      </div>
    </div>
  );
}
