import { useApi } from '@/hooks/api/use-api';

export const useApiToken = () => {
  const { mutationWithAuth } = useApi();

  const validateToken = async () => {
    try {
      const url = `/validate-token`;
      const options: RequestInit = {
        method: 'POST',
      };
      await mutationWithAuth(url, options);
      return true;
    } catch {
      return false;
    }
  };

  return { validateToken };
};
