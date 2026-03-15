import type { Bookmark } from '@/entities/bookmark/model/types';
import BookmarkItem from '@/entities/bookmark/ui/bookmark-item';
import type { ReactNode } from 'react';

type Props = {
  bookmarks: Bookmark[];
  renderAction?: (bookmark: Bookmark) => ReactNode;
};

export default function BookmarkList({ bookmarks, renderAction }: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <article>
            <BookmarkItem
              bookmark={bookmark}
              action={renderAction?.(bookmark)}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
