import type {
  UpdateSubscriptionPlan,
  UpdateUserProfile,
  UserProfile,
  UserProfileCounts,
} from '@/entities/user/model/types';
import { getCsrfToken } from '@/shared/api/csrf';
import { fetchBooksApi } from '@/shared/api/fetch';

// 自分のプロフィール情報
export const getUserProfile = async () => {
  const path = `/me/profile`;
  const response = await fetchBooksApi<UserProfile>(path);
  return response.data;
};

// 自分のレビュー、お気に入り、ブックマークの数
export const getUserProfileCounts = async () => {
  const path = `/me/profile-counts`;
  const response = await fetchBooksApi<UserProfileCounts>(path);
  return response.data;
};

// 自分のプロフィール情報を更新
export const updateUserProfile = async (requestBody: UpdateUserProfile) => {
  const path = `/me/profile`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// 自分のサブスクリプションプランを更新
export const updateSubscriptionPlan = async (
  requestBody: UpdateSubscriptionPlan
) => {
  const path = `/me/subscription`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  const response = await fetchBooksApi<UserProfile>(path, options);
  return response.data;
};
