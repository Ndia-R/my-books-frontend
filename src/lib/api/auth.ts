import { fetchBffApi } from '@/lib/api/fetch';
import { buildQueryString } from '@/lib/url-builder';
import { getCsrfToken } from '@/lib/utils';

// 完全ログアウト（BFFセッション + Keycloakセッションクリア）
export const logoutUser = async () => {
  const path = '/logout';
  const queryString = buildQueryString({ complete: true });
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBffApi(path + queryString, options);
};
