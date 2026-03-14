import BookmarkItem from '@/widgets/bookmarks/ui/bookmark-item';
import type { Bookmark } from '@/entities/bookmark/model/types';

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
