import BookmarkItem from '@/components/bookmarks/bookmark-item';
import {
  Bookmark,
  BookmarkDeleteMutation,
  BookmarkUpdateMutation,
} from '@/types';

type Props = {
  bookmarks: Bookmark[];
  updateMutation: BookmarkUpdateMutation;
  deleteMutation: BookmarkDeleteMutation;
};

export default function BookmarkList({
  bookmarks,
  updateMutation,
  deleteMutation,
}: Props) {
  return (
    <ul className="flex flex-col gap-y-2">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <article>
            <BookmarkItem
              bookmark={bookmark}
              updateMutation={updateMutation}
              deleteMutation={deleteMutation}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}
