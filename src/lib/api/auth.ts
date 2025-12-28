import { fetchBffApi } from '@/lib/api/fetch';
import { getCsrfToken } from '@/lib/utils';

// 完全ログアウト（BFFセッション + Keycloakセッションクリア）
export const logoutUser = async () => {
  const endpoint = `/logout?complete=true`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBffApi(endpoint, options);
};
