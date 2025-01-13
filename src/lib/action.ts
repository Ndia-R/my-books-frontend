import { fetchWithAuth } from '@/lib/auth';
import { CreateReview } from '@/types/review';
import { ChangeEmail, ChangePassword, UpdateCurrentUser } from '@/types/user';

export const updateCurrentUser = async (requestBody: UpdateCurrentUser) => {
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

export const changePassword = async (requestBody: ChangePassword) => {
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

export const changeEmail = async (requestBody: ChangeEmail) => {
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

export const createReview = async (reqestBody: CreateReview) => {
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
