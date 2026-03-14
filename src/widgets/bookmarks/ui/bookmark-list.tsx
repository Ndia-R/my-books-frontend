import type { Bookmark } from '@/entities/bookmark';
import BookmarkItem from '@/widgets/bookmarks/ui/bookmark-item';

type Props = {
  bookmarks: Bookmark[];
};

export default function BookmarkList({ bookmarks }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <article>
            <BookmarkItem bookmark={bookmark} />
          </article>
        </li>
      ))}
    </ul>
  );
}
