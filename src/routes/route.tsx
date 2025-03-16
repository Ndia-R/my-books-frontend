import BookDetailPage from '@/routes/book/[bookId]/page';
import BookmarksPage from '@/routes/bookmarks/page';
import DiscoverPage from '@/routes/discover/page';
import FavoritesPage from '@/routes/favorites/page';
import RootLayout from '@/routes/layout';
import LoginPage from '@/routes/login/page';
import MyReviewsPage from '@/routes/my-reviews/page';
import RootPage from '@/routes/page';
import { ProtectedRoute } from '@/routes/protected-route';
import RankingPage from '@/routes/ranking/page';
import BookReadPage from '@/routes/read/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import BookReadTableOfContentsPage from '@/routes/read/[bookId]/table-of-contents/page';
import SearchPage from '@/routes/search/page';
import ChangeEmailPage from '@/routes/settings/change-email/page';
import ChangePasswordPage from '@/routes/settings/change-password/page';
import ChangeUserInfoPage from '@/routes/settings/change-user-info/page';
import ProfilePage from '@/routes/settings/profile/page';
import SignupPage from '@/routes/signup/page';
import SpecialFeaturesPage from '@/routes/special-features/page';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route path="book">
          <Route path=":bookId" element={<BookDetailPage />} />
        </Route>

        <Route path="read">
          <Route path=":bookId">
            <Route path="table-of-contents" element={<BookReadTableOfContentsPage />} />
          </Route>
        </Route>

        <Route path="search" element={<SearchPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="special-features" element={<SpecialFeaturesPage />} />

        {/* 以下、認証が必要な画面 */}
        <Route element={<ProtectedRoute />}>
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="my-reviews" element={<MyReviewsPage />} />

          <Route path="settings">
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-user-info" element={<ChangeUserInfoPage />} />
            <Route path="change-email" element={<ChangeEmailPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>

          <Route path="read/:bookId">
            <Route path="chapter/:chapterNumber">
              <Route path="page/:pageNumber" element={<BookReadPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
