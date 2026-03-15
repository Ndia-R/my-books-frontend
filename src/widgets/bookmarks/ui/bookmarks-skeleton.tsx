import BookmarkListSkeleton from '@/entities/bookmark/ui/bookmark-list-skeleton';

export default function BookmarksSkeleton() {
  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <p className="h-6"></p>
      <BookmarkListSkeleton />
    </div>
  );
}
