import AuthCallbackPage from '@/app/auth-callback/page';
import BookDetailPage from '@/app/book/[bookId]/page';
import BookmarksPage from '@/app/bookmarks/page';
import DiscoverPage from '@/app/discover/page';
import FavoritesPage from '@/app/favorites/page';
import ForbiddenPage from '@/app/forbidden/page';
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
import { APP_BASE_PATH } from '@/constants/constants';
import { RoleType } from '@/constants/roles';
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
        {/* ---- 認証が不要な画面（ログインしていなくてもOK） ---- */}
        <Route index element={<RootPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="auth-callback" element={<AuthCallbackPage />} />
        <Route path="forbidden" element={<ForbiddenPage title="403" />} />

        <Route path="book/:bookId" element={<BookDetailPage />} />
        <Route
          path="read/:bookId/table-of-contents"
          element={<BookReadTableOfContentsPage />}
        />

        <Route path="search" element={<SearchPage />} />
        <Route path="discover" element={<DiscoverPage title="ジャンル" />} />
        <Route path="ranking" element={<RankingPage title="ランキング" />} />
        <Route
          path="special-features"
          element={<SpecialFeaturesPage title="特集" />}
        />
        <Route path="settings" element={<SettingsPage title="設定" />} />

        {/* ---- 認証が必要な画面（すべてのロールOK） ---- */}
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
        </Route>

        {/* ---- 認証が必要な画面（すべてのロールOK） ---- */}
        <Route
          element={
            <ProtectedRoute
              permittedRoles={[RoleType.PremiumUser, RoleType.Admin]}
            />
          }
        >
          <Route
            path="read/:bookId/chapter/:chapterNumber/page/:pageNumber"
            element={<BookReadPage />}
          />
        </Route>

        {/* ---- NotFound（上記すべてのパスに当てはまらなかった場合） ---- */}
        <Route path="*" element={<NotFoundPage title="404" />} />
      </Route>
    </Route>
  ),
  {
    // ベースパス設定: nginxのプロキシ設定と合わせる
    // すべてのルーティングが APP_BASE_PATH 配下になる
    basename: APP_BASE_PATH,
  }
);
