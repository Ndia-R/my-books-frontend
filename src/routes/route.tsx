import BookDetailPage from '@/routes/book/[bookId]/page';
import BookmarksPage from '@/routes/bookmarks/page';
import DiscoverPage from '@/routes/discover/page';
import FavoritesPage from '@/routes/favorites/page';
import RootLayout from '@/routes/layout';
import LoginPage from '@/routes/login/page';
import MyReviewsPage from '@/routes/my-reviews/page';
import RootPage from '@/routes/page';
import { ProtectedRoute } from '@/routes/protected-route';
import BookReadPage from '@/routes/read/[bookId]/chapter/[chapterNumber]/page/[pageNumber]/page';
import BookReadTableOfContentsPage from '@/routes/read/[bookId]/table-of-contents/page';
import SearchPage from '@/routes/search/page';
import ChangeEmailPage from '@/routes/settings/change-email/page';
import ChangePasswordPage from '@/routes/settings/change-password/page';
import ChangeUserInfoPage from '@/routes/settings/change-user-info/page';
import ProfilePage from '@/routes/settings/profile/page';
import SignupPage from '@/routes/signup/page';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootPage />} />

        <Route path="book/:bookId" element={<BookDetailPage />} />
        <Route path="book/:bookId/reviews" element={<BookDetailPage />} />

        <Route path="read/:bookId">
          <Route path="table-of-contents" element={<BookReadTableOfContentsPage />} />
        </Route>

        <Route path="search">
          <Route index element={<SearchPage />} />
        </Route>

        <Route path="discover">
          <Route index element={<DiscoverPage />} />
        </Route>

        <Route path="login">
          <Route index element={<LoginPage />} />
        </Route>

        <Route path="signup">
          <Route index element={<SignupPage />} />
        </Route>

        {/* 以下、認証が必要な画面 */}
        <Route element={<ProtectedRoute />}>
          <Route path="favorites">
            <Route index element={<FavoritesPage />} />
          </Route>

          <Route path="my-reviews">
            <Route index element={<MyReviewsPage />} />
          </Route>

          <Route path="bookmarks">
            <Route index element={<BookmarksPage />} />
          </Route>

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
