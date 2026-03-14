import { fetchBffApi } from '@/shared/api/fetch';
import { buildQueryString } from '@/shared/api/url-builder';
import { getCsrfToken } from '@/shared/lib/utils';

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
