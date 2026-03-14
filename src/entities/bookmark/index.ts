// model
export { bookmarkQueryKeys } from './model/query-keys';
export type {
  Bookmark,
  BookmarkCreateMutation,
  BookmarkDeleteMutation,
  BookmarkPage,
  BookmarkRequest,
  BookmarkUpdateMutation,
  BookmarkUpdateParams,
} from './model/types';

// api
export {
  createBookmark,
  deleteBookmark,
  getUserBookmarks,
  getUserBookmarksByBookId,
  updateBookmark,
} from './api/bookmarks';
