import BookIdPage from '@/routes/book/[bookId]/page';
import DiscoverPage from '@/routes/discover/page';
import FavoritesPage from '@/routes/favorite/page';
import RootLayout from '@/routes/layout';
import LoginPage from '@/routes/login/page';
import MyListsPage from '@/routes/my-lists/page';
import RootPage from '@/routes/page';
import { ProtectedRoute } from '@/routes/protected-route';
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

        <Route path="book">
          <Route path=":bookId" element={<BookIdPage />} />
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

        <Route element={<ProtectedRoute />}>
          <Route path="favorites">
            <Route index element={<FavoritesPage />} />
          </Route>

          <Route path="my-lists">
            <Route index element={<MyListsPage />} />
          </Route>

          <Route path="settings">
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-user-info" element={<ChangeUserInfoPage />} />
            <Route path="change-email" element={<ChangeEmailPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
