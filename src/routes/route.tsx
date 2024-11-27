import BookIdPage from '@/routes/book/[bookId]/page';
import DiscoverPage from '@/routes/discover/page';
import FavoritesPage from '@/routes/favorite/page';
import RootLayout from '@/routes/layout';
import LoginPage from '@/routes/login/page';
import RootPage from '@/routes/page';
import SearchPage from '@/routes/search/page';
import SettingsPage from '@/routes/settings/page';
import SignUpPage from '@/routes/sign-up/page';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootPage />} loader={RootPage.loader} />

        <Route path="book">
          <Route path=":bookId" element={<BookIdPage />} loader={BookIdPage.loader} />
        </Route>

        <Route path="favorites">
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path="settings">
          <Route index element={<SettingsPage />} />
        </Route>

        <Route path="search">
          <Route index element={<SearchPage />} loader={SearchPage.loader} />
        </Route>

        <Route path="discover">
          <Route index element={<DiscoverPage />} loader={DiscoverPage.loader} />
        </Route>

        <Route path="login">
          <Route index element={<LoginPage />} />
        </Route>

        <Route path="sign-up">
          <Route index element={<SignUpPage />} />
        </Route>
      </Route>
    </Route>
  )
);
