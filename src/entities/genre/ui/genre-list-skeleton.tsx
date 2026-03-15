import { Skeleton } from '@/shared/ui/skeleton';

const GenreItemSkeleton = () => {
  return (
    <article>
      <Skeleton
        className="bg-muted-foreground/5 h-8 w-24"
        aria-label="ジャンル情報を読み込み中"
      />
    </article>
  );
};

export default function GenreListSkeleton() {
  return (
    <ul className="flex flex-wrap gap-1">
      {Array.from({ length: 12 }, (_, index) => (
        <li key={index}>
          <GenreItemSkeleton />
        </li>
      ))}
    </ul>
  );
}
