import RootLayout from '@/app/layout';
import ProtectedRoute from '@/app/routes/protected-route';
import AuthCallbackPage from '@/pages/auth-callback/ui/page';
import BookDetailPage from '@/pages/book-detail/ui/page';
import BookReadPreviewPage from '@/pages/book-preview/ui/page';
import BookReadContentPage from '@/pages/book-reading/ui/page';
import BookTableOfContentsPage from '@/pages/book-toc/ui/page';
import BookmarksPage from '@/pages/bookmarks/ui/page';
import DiscoverPage from '@/pages/discover/ui/page';
import FavoritesPage from '@/pages/favorites/ui/page';
import ForbiddenPage from '@/pages/forbidden/ui/page';
import RootPage from '@/pages/home/ui/page';
import MyReviewsPage from '@/pages/my-reviews/ui/page';
import NotFoundPage from '@/pages/not-found/ui/page';
import PricingPage from '@/pages/pricing/ui/page';
import ProfilePage from '@/pages/profile/ui/page';
import RankingPage from '@/pages/ranking/ui/page';
import SearchPage from '@/pages/search/ui/page';
import SettingAppearancePage from '@/pages/settings-appearance/ui/page';
import SettingProfilePage from '@/pages/settings-profile/ui/page';
import SettingsPage from '@/pages/settings/ui/page';
import SpecialFeaturesPage from '@/pages/special-features/ui/page';
import { APP_BASE_PATH } from '@/shared/config/constants';
import { SubscriptionPlan } from '@/shared/config/subscription-plans';
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
