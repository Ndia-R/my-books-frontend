import { fetchWithAuth } from '@/lib/auth';
import { CreateReviewRequest } from '@/types/review';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  UpdateUserRequest,
} from '@/types/user';

export const updateCurrentUser = async (requestBody: UpdateUserRequest) => {
  try {
    const url = `/me`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const changePassword = async (requestBody: ChangePasswordRequest) => {
  try {
    const url = `/me/password`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const changeEmail = async (requestBody: ChangeEmailRequest) => {
  try {
    const url = `/me/email`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const createReview = async (reqestBody: CreateReviewRequest) => {
  try {
    const url = `/reviews`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqestBody),
    };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
