import AuthCallbackPage from '@/app/auth-callback/page';
import BookmarksPage from '@/app/bookmarks/page';
import BookDetailPage from '@/app/books/[bookId]/page';
import BookTableOfContentsPage from '@/app/books/[bookId]/table-of-contents/page';
import DiscoverPage from '@/app/discover/page';
import FavoritesPage from '@/app/favorites/page';
import ForbiddenPage from '@/app/forbidden/page';
import RootLayout from '@/app/layout';
import MyReviewsPage from '@/app/my-reviews/page';
import NotFoundPage from '@/app/not-found';
import RootPage from '@/app/page';
import PricingPage from '@/app/pricing/page';
import ProfilePage from '@/app/profile/page';
import RankingPage from '@/app/ranking/page';
import BookReadContentPage from '@/app/read-content/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import BookReadPreviewPage from '@/app/read-preview/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import SearchPage from '@/app/search/page';
import SettingAppearancePage from '@/app/settings/appearance/page';
import SettingsPage from '@/app/settings/page';
import SettingProfilePage from '@/app/settings/profile/page';
import SpecialFeaturesPage from '@/app/special-features/page';
import { APP_BASE_PATH } from '@/constants/constants';
import { SubscriptionPlan } from '@/constants/subscription-plans';
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

        <Route path="auth-callback" element={<AuthCallbackPage />} />
        <Route path="forbidden" element={<ForbiddenPage title="403" />} />

        <Route path="books/:bookId" element={<BookDetailPage />} />
        <Route
          path="books/:bookId/table-of-contents"
          element={<BookTableOfContentsPage />}
        />

        <Route
          path="read-preview/:bookId/chapter/:chapterNumber/page/:pageNumber"
          element={<BookReadPreviewPage />}
        />

        <Route path="search" element={<SearchPage />} />
        <Route path="discover" element={<DiscoverPage title="ジャンル" />} />
        <Route path="ranking" element={<RankingPage title="ランキング" />} />
        <Route
          path="special-features"
          element={<SpecialFeaturesPage title="特集" />}
        />
        <Route path="settings" element={<SettingsPage title="設定" />} />
        <Route path="settings/plan" element={<PricingPage title="プラン" />} />

        {/* ---- 認証が必要な画面（すべてのロールOK） ---- */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="profile"
            element={<ProfilePage title="プロフィール" />}
          />
          <Route
            path="profile/change-user-info"
            element={<SettingProfilePage title="ユーザー情報変更" />}
          />
          <Route
            path="favorites"
            element={<FavoritesPage title="お気に入り" />}
          />
          <Route
            path="settings/theme"
            element={<SettingAppearancePage title="テーマ" />}
          />
        </Route>

        {/* ---- 認証が必要な画面（プレミアムユーザーのみ） ---- */}
        <Route element={<ProtectedRoute plans={[SubscriptionPlan.PREMIUM]} />}>
          <Route
            path="bookmarks"
            element={<BookmarksPage title="ブックマーク" />}
          />
          <Route
            path="my-reviews"
            element={<MyReviewsPage title="マイレビュー" />}
          />
          <Route
            path="read-content/:bookId/chapter/:chapterNumber/page/:pageNumber"
            element={<BookReadContentPage />}
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
