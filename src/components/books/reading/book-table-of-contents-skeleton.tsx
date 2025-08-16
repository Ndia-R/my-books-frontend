import { Skeleton } from '@/components/ui/skeleton';

export default function BookTableOfContentsSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-12 px-4 py-12 sm:px-20">
        <div className="flex w-full flex-col items-center gap-y-6 sm:items-start">
          <div className="text-3xl font-bold sm:text-5xl">
            <Skeleton
              className="bg-muted-foreground/5 h-8 w-64 sm:h-12 sm:w-96"
              aria-label="書籍タイトルを読み込み中"
            />
          </div>

          <Skeleton
            className="bg-muted-foreground/5 h-8 w-44"
            aria-label="最初から読むボタンを読み込み中"
          />
        </div>

        <ul className="flex flex-col gap-y-8">
          {[...Array<number>(5)].map((_, index) => (
            <li
              className="flex flex-col items-center sm:items-start"
              key={index}
            >
              <div className="text-muted-foreground text-sm">
                <Skeleton
                  className="bg-muted-foreground/5 my-1 h-5 w-10"
                  aria-label="章番号を読み込み中"
                />
              </div>
              <Skeleton
                className="bg-muted-foreground/5 h-8 w-32"
                aria-label="書籍タイトルを読み込み中"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
