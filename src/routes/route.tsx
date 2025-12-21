import AuthCallbackPage from '@/routes/auth-callback/page';
import BookDetailPage from '@/routes/book/[bookId]/page';
import BookmarksPage from '@/routes/bookmarks/page';
import DiscoverPage from '@/routes/discover/page';
import FavoritesPage from '@/routes/favorites/page';
import RootLayout from '@/routes/layout';
import MyReviewsPage from '@/routes/my-reviews/page';
import NotFoundPage from '@/routes/not-found';
import RootPage from '@/routes/page';
import ChangeUserInfoPage from '@/routes/profile/change-user-info/page';
import ProfilePage from '@/routes/profile/page';
import ProtectedRoute from '@/routes/protected-route';
import RankingPage from '@/routes/ranking/page';
import BookReadPage from '@/routes/read/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import BookReadTableOfContentsPage from '@/routes/read/[bookId]/table-of-contents/page';
import SearchPage from '@/routes/search/page';
import SettingsPage from '@/routes/settings/page';
import SpecialFeaturesPage from '@/routes/special-features/page';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootPage />} />

        <Route path="auth-callback" element={<AuthCallbackPage />} />

        <Route path="book">
          <Route path=":bookId" element={<BookDetailPage />} />
        </Route>

        <Route path="read">
          <Route path=":bookId">
            <Route
              path="table-of-contents"
              element={<BookReadTableOfContentsPage />}
            />
          </Route>
        </Route>

        <Route path="search" element={<SearchPage />} />
        <Route path="discover" element={<DiscoverPage title="ジャンル" />} />
        <Route path="ranking" element={<RankingPage title="ランキング" />} />
        <Route
          path="special-features"
          element={<SpecialFeaturesPage title="特集" />}
        />
        <Route path="settings" element={<SettingsPage title="設定" />} />

        {/* 以下、認証が必要な画面 */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="favorites"
            element={<FavoritesPage title="お気に入り" />}
          />
          <Route
            path="bookmarks"
            element={<BookmarksPage title="ブックマーク" />}
          />
          <Route
            path="my-reviews"
            element={<MyReviewsPage title="マイレビュー" />}
          />

          <Route path="profile">
            <Route index element={<ProfilePage title="プロフィール" />} />
            <Route
              path="change-user-info"
              element={<ChangeUserInfoPage title="ユーザー情報変更" />}
            />
          </Route>

          <Route path="read/:bookId">
            <Route path="chapter/:chapterNumber">
              <Route path="page/:pageNumber" element={<BookReadPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage title="404" />} />
      </Route>
    </Route>
  )
);
