import BookmarkItem from '@/components/bookmarks/bookmark-item';
import { Bookmark } from '@/types';

type Props = {
  bookmarks: Bookmark[];
};

export default function BookmarkList({ bookmarks }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <article>
            <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl">
              <BookmarkItem bookmark={bookmark} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
