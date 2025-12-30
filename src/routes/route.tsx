import AuthCallbackPage from '@/app/auth-callback/page';
import BookDetailPage from '@/app/book/[bookId]/page';
import BookmarksPage from '@/app/bookmarks/page';
import DiscoverPage from '@/app/discover/page';
import FavoritesPage from '@/app/favorites/page';
import RootLayout from '@/app/layout';
import LoginPage from '@/app/login/page';
import MyReviewsPage from '@/app/my-reviews/page';
import NotFoundPage from '@/app/not-found';
import RootPage from '@/app/page';
import ChangeUserInfoPage from '@/app/profile/change-user-info/page';
import ProfilePage from '@/app/profile/page';
import RankingPage from '@/app/ranking/page';
import BookReadPage from '@/app/read/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import BookReadTableOfContentsPage from '@/app/read/[bookId]/table-of-contents/page';
import SearchPage from '@/app/search/page';
import SettingsPage from '@/app/settings/page';
import SpecialFeaturesPage from '@/app/special-features/page';
import ProtectedRoute from '@/routes/protected-route';
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

        <Route path="login" element={<LoginPage />} />
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
  ),
  {
    // ベースパス設定: nginxのプロキシ設定と合わせる
    // すべてのルーティングが /my-books 配下になる
    // 例: / → /my-books/, /search → /my-books/search
    basename: '/my-books',
  }
);
